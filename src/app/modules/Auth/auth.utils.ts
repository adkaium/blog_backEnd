import jwt from 'jsonwebtoken';
// import config from '../../config';
import { Types } from 'mongoose';

// export const createToken = (id: Types.ObjectId, role: 'admin' | 'user') => {
//   return jwt.sign({ id, role }, config.jwt_access_token || 'secret', {
//     expiresIn: '1h',
//   });
// };

export const createToken = (
  jwtPayload: { id: Types.ObjectId; role: 'admin' | 'user' },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
