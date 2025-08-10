import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { omit } from 'lodash';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const message = data?.message || 'Success';

        return {
          data: omit(data, ['message']),
          statusCode: context.switchToHttp().getResponse().statusCode,
          timestamp: new Date().toISOString(),
          message,
        };
      }),
    );
  }
}
