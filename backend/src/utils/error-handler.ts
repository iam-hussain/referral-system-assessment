import { ErrorRequestHandler, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import logger from '@/utils/logger';

// Handle all undefined routes and respond with 404 Not Found
const handleNotFound: RequestHandler = (_req, res) => {
  res.status(StatusCodes.NOT_FOUND).send({
    error: 'Not Found',
    message: 'The requested resource could not be found',
  });
};

// Middleware to respond with an appropriate error message based on the environment
const handleErrorResponse: ErrorRequestHandler = (err, _req, res) => {
  const isProduction = process.env.NODE_ENV === 'production';

  // Log the error to the console (or wherever your logger is configured)
  logger.error({
    message: err.message,
    stack: !isProduction ? err.stack : undefined, // Only include stack trace in non-production environments
    statusCode: res.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  });

  const statusCode = res.statusCode !== StatusCodes.OK ? res.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;

  // Respond with different messages depending on the environment
  const errorResponse = {
    message: isProduction ? 'Something went wrong' : err.message,
    ...(isProduction ? {} : { stack: err.stack }), // Include stack in non-production
  };

  res.status(statusCode).json(errorResponse); // Send JSON error response
};

export default () => [handleNotFound, handleErrorResponse];
