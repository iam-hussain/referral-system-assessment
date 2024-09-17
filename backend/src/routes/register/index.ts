import express, { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { responder, ResponseStatus, ServiceResponse } from '@/utils/response';

const registerRouter: Router = (() => {
  const router = express.Router();

  router.post('/register', async (req, res) => {
    const serviceResponse = new ServiceResponse(ResponseStatus.Success, 'test', null, StatusCodes.OK);
    return responder(serviceResponse, res);
  });

  return router;
})();

export default registerRouter;
