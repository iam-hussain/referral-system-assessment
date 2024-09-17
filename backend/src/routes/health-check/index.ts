import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { responder, ResponseStatus, ServiceResponse } from '@/utils/response';

const healthCheckRouter: Router = (() => {
  const router = express.Router();

  router.get('/ping', (_req: Request, res: Response) => {
    const serviceResponse = new ServiceResponse(ResponseStatus.Success, 'pong', null, StatusCodes.OK);
    return responder(serviceResponse, res);
  });

  return router;
})();

export default healthCheckRouter;
