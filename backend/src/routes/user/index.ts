import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import database from '@/providers/database';
import { responder, ResponseStatus, ServiceResponse } from '@/utils/response';

const userRouter: Router = (() => {
  const router = express.Router();

  router.get('/', async (_req: Request, res: Response) => {
    const users = await database.user.findMany({ select: { id: true, name: true, referralCode: true, points: true } });
    const serviceResponse = new ServiceResponse(ResponseStatus.Success, 'Users', users, StatusCodes.OK);
    return responder(serviceResponse, res);
  });

  return router;
})();

export default userRouter;
