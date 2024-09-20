import { Response } from 'express';

export enum ResponseStatus {
  Success,
  Failed,
}

export class ServiceResponse<T = null> {
  success: boolean;
  message: string;
  payload: T;
  code: number;

  constructor(status: ResponseStatus, message: string, payload: T, statusCode: number) {
    this.success = status === ResponseStatus.Success;
    this.message = message;
    this.payload = payload;
    this.code = statusCode;
  }
}

export const responder = (payload: any, response: Response, code: number = 200) => {
  return response.status(payload?.code || code).send(payload);
};

export const redirectResponder = (response: Response, url: string, statusCode: number = 302) => {
  return response.redirect(statusCode, url);
};
