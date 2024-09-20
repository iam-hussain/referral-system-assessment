import jwt from 'jsonwebtoken';

import env from '@/providers/env-config';
import logger from '@/utils/logger';

export default {
  decode: (token: string) => {
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET);
      return decoded as { data: { id: string } };
    } catch (err) {
      logger.error(err);
      return null;
    }
  },

  encode: (payload: { id: string }) => {
    return new Promise((resolve, reject) => {
      jwt.sign(
        {
          data: payload,
        },
        env.JWT_SECRET,
        { expiresIn: '1h' },
        function (err, token) {
          if (err) {
            logger.error(err);
            reject(err);
          }
          resolve(token);
        }
      );
    });
  },
};
