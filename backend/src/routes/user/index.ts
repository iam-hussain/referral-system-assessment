import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import database from '@/providers/database';
import asyncHandler from '@/utils/async-handler';
import { responder, ResponseStatus, ServiceResponse } from '@/utils/response';

const userRouter: Router = (() => {
  const router = express.Router();

  router.get(
    '/me',
    asyncHandler(async (req, res) => {
      if (!req.context?.id) {
        const unauthorizedResponse = new ServiceResponse(
          ResponseStatus.Failed,
          'Token Not Found',
          null,
          StatusCodes.UNAUTHORIZED
        );
        return responder(unauthorizedResponse, res);
      }

      const user = await database.user.findUnique({ where: { id: req.context.id } });

      if (!user) {
        const unauthorizedResponse = new ServiceResponse(
          ResponseStatus.Failed,
          'User Not Found',
          null,
          StatusCodes.UNAUTHORIZED
        );
        return responder(unauthorizedResponse, res);
      }

      const response = new ServiceResponse(ResponseStatus.Success, 'User found', user, StatusCodes.OK);
      return responder(response, res);
    })
  );

  router.get(
    '/',
    asyncHandler(async (_req: Request, res: Response) => {
      const users = await database.user.findMany({
        select: { id: true, name: true, referralCode: true, points: true },
      });
      const serviceResponse = new ServiceResponse(ResponseStatus.Success, 'Users', users, StatusCodes.OK);
      return responder(serviceResponse, res);
    })
  );

  return router;
})();

export default userRouter;
