import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodSchema } from 'zod';

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

export const responder = (serviceResponse: any, response: Response, code: number = 200) => {
  return response.status(serviceResponse?.code || code).send(serviceResponse);
};

export const validateRequest = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({ body: req.body, query: req.query, params: req.params });
    next();
  } catch (err) {
    const statusCode = StatusCodes.BAD_REQUEST;
    res.status(statusCode).send(err);
  }
};
