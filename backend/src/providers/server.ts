import cors from 'cors';
import express, { Express } from 'express';
import session from 'express-session';
import helmet from 'helmet';
import passport from 'passport';

import env from '@/providers/env-config';
import authRouter from '@/routes/auth';
import healthCheckRouter from '@/routes/health-check';
import userRouter from '@/routes/user';
import { handleErrorResponse, handleNotFound } from '@/utils/error-handler';
import jwt from '@/utils/jwt';
import requestLogger from '@/utils/request-logger';

const app: Express = express();

// request logging
app.use(requestLogger());

// security middlewares
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());

// parse application/x-www-form-urlencoded
app.use(express.json());

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req: any, res, next) => {
  let context: null | { id: string } = null;

  const authorization = req.headers['authorization'] || '';
  if (authorization) {
    const accessToken = authorization?.startsWith('Bearer ') ? authorization.slice(7) : null;

    if (accessToken) {
      const decoded = jwt.decode(accessToken);
      if (decoded?.id) {
        context = { id: decoded.id };
      }
    }
  }

  req.context = context;

  next();
});

// initialize passport
app.use(passport.initialize());

// routes
app.use('/', healthCheckRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);

// error handlers
app.use(handleNotFound);

// 404 handlers
app.use(handleErrorResponse);

export default app;
