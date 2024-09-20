import express, { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import passport from 'passport';
import { Strategy } from 'passport-twitter';

import database from '@/providers/database';
import env from '@/providers/env-config';
import asyncHandler from '@/utils/async-handler';
import generateNanoID from '@/utils/generate-nano-id';
import jwt from '@/utils/jwt';
import { redirectResponder, responder, ResponseStatus, ServiceResponse } from '@/utils/response';

const frontendBaseURL = 'http://localhost:5173';

// Passport with Twitter Strategy
passport.use(
  new Strategy(
    {
      consumerKey: env.TWITTER_APP_KEY,
      consumerSecret: env.TWITTER_APP_SECRET,
      callbackURL: 'http://localhost:4000/auth/twitter/callback',
    },
    async (token, tokenSecret, profile, done) => {
      return done(null, { id: profile.id, name: profile.displayName });
    }
  )
);

const authRouter: Router = (() => {
  const router = express.Router();

  router.get(
    '/twitter',
    asyncHandler((req, res, next) => {
      // Capture referral code from query parameters
      const referralCode = req.query.referralCode;

      if (referralCode && typeof referralCode === 'string') {
        // Store referral code in session
        req.session.referralCode = referralCode;
      }

      // Proceed to authentication
      return passport.authenticate('twitter')(req, res, next);
    })
  );

  router.get(
    '/twitter/callback',
    passport.authenticate('twitter', { session: false }),
    asyncHandler(async (req, res) => {
      // Retrieve referral code from session
      const referralCode = req.session?.referralCode;

      if (referralCode) {
        // Clear the referral code from session
        delete req.session?.referralCode;
      }

      const twitterUser = req.user || undefined;

      if (!twitterUser?.id) {
        const redirect = new URL(`${frontendBaseURL}/signup`);
        if (referralCode) {
          redirect.searchParams.append('referralCode', referralCode);
        }
        redirect.searchParams.append('failed', 'yes');

        return redirectResponder(res, redirect.toString());
      }

      const createdAt = new Date();

      const user = await database.user.upsert({
        create: {
          name: twitterUser.name,
          twitterId: twitterUser.id,
          referralCode: generateNanoID(),
          createdAt,
        },
        update: {},
        where: { twitterId: twitterUser.id },
      });

      if (referralCode && createdAt.getTime() === new Date(user.createdAt).getTime()) {
        await database.user.update({
          where: {
            id: user.id,
          },
          data: {
            referee: {
              connect: {
                referralCode,
              },
              update: {
                data: {
                  points: { increment: 10 },
                },
              },
            },
          },
        });
      }

      const accessToken = (await jwt.encode({ id: user.id })) as string;
      const redirect = new URL(`${frontendBaseURL}/signup`);
      redirect.searchParams.append('token', accessToken);

      return redirectResponder(res, redirect.toString());
    })
  );

  router.get(
    '/logout',
    asyncHandler(async (req, res, next) => {
      await new Promise<void>((resolve, reject) => {
        req.logout((err: any) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      }).catch(next);
      const response = new ServiceResponse(ResponseStatus.Success, 'User logged out', null, StatusCodes.OK);
      return responder(response, res);
    })
  );

  return router;
})();

export default authRouter;
