import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { ResponseJson } from '../types/http-response.type';

@Catch(ResponseJson)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(responseJson: ResponseJson, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { statusCode } = responseJson;

    response.status(statusCode).json({
      timestamp: new Date().toISOString(),
      ...responseJson,
    });
  }
}
