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

const loginUser = async (payload: TLoginUser) => {
  const {email} = payload
  // checking if the user is exist
  const user = await User.findOne({email});
  console.log(user);
  if (!user) {
    throw new AppError(404, 'This user is not found !');
  }
  // checking if the user is already deleted

  //   const isDeleted = user?.isDeleted;

  //   if (isDeleted) {
  //     throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  //   }

  // checking if the user is blocked

  //   const userStatus = user?.status;

  //   if (userStatus === 'blocked') {
  //     throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  //   }

  //checking if the password is correct

  //   if (!(await User.isPasswordMatched(payload?.password, user?.password)))
  //     throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client

  

  const accessToken = createToken(user._id, user.role) 

  // const refreshToken = createToken(
  //   jwtPayload,
  //   config.jwt_refresh_token as string,
  //   config.jwt_refresh_expire as string,
  // );

  return {
    accessToken,
    // refreshToken,
    // needsPasswordChange: user?.needsPasswordChange,
  };
};

// const changePassword = async (
//   userData: JwtPayload,
//   payload: { oldPassword: string; newPassword: string },
// ) => {
//   // checking if the user is exist
//   const user = await User.isUserExistsByCustomId(userData.userId);

//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
//   }
//   // checking if the user is already deleted

//   const isDeleted = user?.isDeleted;

//   if (isDeleted) {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
//   }

//   // checking if the user is blocked

//   const userStatus = user?.status;

//   if (userStatus === 'blocked') {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
//   }

//   //checking if the password is correct

//   if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
//     throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

//   //hash new password
//   const newHashedPassword = await bcrypt.hash(
//     payload.newPassword,
//     Number(config.bcrypt_salt_rounds),
//   );

//   await User.findOneAndUpdate(
//     {
//       id: userData.userId,
//       role: userData.role,
//     },
//     {
//       password: newHashedPassword,
//       needsPasswordChange: false,
//       passwordChangedAt: new Date(),
//     },
//   );

//   return null;
// };

// const refreshToken = async (token: string) => {
//   // checking if the given token is valid
//   const decoded = jwt.verify(
//     token,
//     config.jwt_refresh_token as string,
//   ) as JwtPayload;

//   const { userId } = decoded;

//   // checking if the user is exist
//   const user = await User.isUserExistsByCustomId(userId);

//   if (!user) {
//     throw new AppError(404, 'This user is not found !');
//   }
//   // checking if the user is already deleted
//   //   const isDeleted = user?.isDeleted;

//   //   if (isDeleted) {
//   //     throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
//   //   }

//   // checking if the user is blocked
//   //   const userStatus = user?.status;

//   //   if (userStatus === 'blocked') {
//   //     throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
//   //   }

//   //   if (
//   //     user.passwordChangedAt &&
//   //     User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
//   //   ) {
//   //     throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
//   //   }

//   const jwtPayload = {
//     userEmail: user.email,
//     role: user.role,
//   };

//   const accessToken = createToken(
//     jwtPayload,
//     config.jwt_access_token as string,
//     config.jwt_access_expire_in as string,
//   );

//   return {
//     accessToken,
//   };
// };

export const AuthServices = {
  loginUser,
  //   changePassword,
  // refreshToken,
};
