import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, tap, catchError, finalize } from 'rxjs';
import { throwError } from 'rxjs';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('Nestjs');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const { method, url } = req;
    const now = Date.now();

    let errorMessage: string | null = null;
    let errorStatusCode: number | null = null;

    return next.handle().pipe(
      tap(() => {
        // log success
        const statusCode = res.statusCode;
        this.logger.log(
          `${method} ${url} status: ${statusCode} - Duration: ${Date.now() - now}ms`,
        );
      }),
      catchError((err) => {
        // capture error message & status for log in finalize
        errorMessage = err?.message || err;

        if (err instanceof HttpException) {
          errorStatusCode = err.getStatus();
        } else {
          errorStatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return throwError(() => err);
      }),
      finalize(() => {
        if (errorMessage) {
          const statusCode = errorStatusCode ?? res.statusCode;
          this.logger.error(
            `${method} ${url} status: ${statusCode} - Duration: ${Date.now() - now}ms - Error: ${errorMessage}`,
          );
        }
      }),
    );
  }
}
