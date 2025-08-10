import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] | object = 'Internal server error';
    let error: string | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else if (res && typeof res === 'object') {
        // Assume res is Record<string, any>
        const resObj = res as Record<string, any>;
        // Use nullish coalescing operator to avoid falsey but valid values
        message = resObj.message ?? 'Unexpected error';
        error = resObj.error;
      }
    }

    const jsonResponse: Record<string, any> = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      message,
      ...(error && { error }), // Conditionally add error property only if error is truthy
    };

    response.status(status).json(jsonResponse);
  }
}
