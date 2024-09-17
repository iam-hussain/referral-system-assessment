import dotenv from 'dotenv';
import { cleanEnv, host, port, str } from 'envalid';

dotenv.config();

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['staging', 'development', 'test', 'production'] }),
  HOST: host(),
  PORT: port(),
  CORS_ORIGIN: str(),
  DATABASE_URL: str(),
});

export default env;
