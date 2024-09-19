import dotenv from 'dotenv';
import { cleanEnv, host, port, str } from 'envalid';

dotenv.config();

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['staging', 'development', 'test', 'production'] }),
  HOST: host(),
  PORT: port(),
  CORS_ORIGIN: str(),
  DATABASE_URL: str(),
  TWITTER_APP_KEY: str(),
  TWITTER_APP_SECRET: str(),
  JWT_SECRET: str(),
  SESSION_SECRET: str(),
});

export default env;
