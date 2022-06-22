import { HttpStatus } from '@nestjs/common';
import { GenericObject } from './shared.type';

export abstract class ResponseJson {
  constructor(
    response?: any,
    message?: string,
    statusCode?: number,
    name?: string,
  ) {
    this.response = response;
    this.message = message;
    this.statusCode = statusCode;
    this.name = name;
  }
  response!: any;
  message!: string;
  statusCode!: number;
  name!: string;
}

export class ResponseSuccess extends ResponseJson {
  constructor(
    response?: any,
    message?: string,
    statusCode?: number,
  ) {
    super();
    this.response = response || null;
    this.message = message || 'success';
    switch (statusCode) {
      case HttpStatus.OK:
        this.name = 'Http Success 200: OK';
        break;
      case HttpStatus.CREATED:
        this.name = 'Http Success 201: Created';
        break;
      case HttpStatus.ACCEPTED:
        this.name = 'Http Success 202: Accepted';
        break;
      case HttpStatus.NO_CONTENT:
        this.name = 'Http Success 204: No Content';
        break;
      case HttpStatus.RESET_CONTENT:
        this.name = 'Http Success 205: Reset Content';
        break;
      default:
        this.name = 'Http Success';
    }
  }
}

export class ResponseException extends ResponseJson {
  constructor(
    response?: any,
    message?: string,
    statusCode?: number,
  ) {
    super();
    this.message = message || 'bad request';
    this.statusCode = statusCode || HttpStatus.BAD_REQUEST;
    this.response = response || null;
    switch (statusCode) {
      case HttpStatus.UNAUTHORIZED:
        this.name = 'Http Exception 401: Unauthenticated';
        break;
      case HttpStatus.FORBIDDEN:
        this.name = 'Http Exception 403: Forbidden';
        break;
      case HttpStatus.NOT_FOUND:
        this.name = 'Http Exception 404: Not Found';
        break;
      case HttpStatus.INTERNAL_SERVER_ERROR:
        this.name = 'Http Exception 500: Internal Server Error';
        break;
      default:
        this.name = 'Http Exception 400: Bad Request';
    }
  }
}

export type DefaultPromiseResponse = Promise<ResponseJson>;
