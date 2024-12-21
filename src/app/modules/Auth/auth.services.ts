/* eslint-disable no-unused-vars */
// import bcrypt from 'bcrypt';
// import httpStatus from 'http-status';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import jwt, { JwtPayload } from 'jsonwebtoken';
// import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
import config from '../../config';


const loginUser = async (payload: TLoginUser) => {
  const { email } = payload;
  // checking if the user is exist
  const user = await User.findOne({ email });

 

  if (!user) {
    throw new AppError(404, 'This user is not found !');
    }
    
  
 const jwtPayload = {
    id: user._id,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expire_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token as string,
    config.jwt_refresh_expire as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};
const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_token as string,
  ) as JwtPayload;

  const { id } = decoded;

  // checking if the user is exist
  const user = await User.findOne(id);

  if (!user) {
    throw new AppError(404, 'This user is not found !');
  }

  const jwtPayload = {
    id: user._id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_expire_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
  refreshToken,
};
