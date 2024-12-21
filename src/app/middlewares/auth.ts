/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../modules/user/user.model';
import config from '../config';
import AppError from '../errors/AppError';

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    let token = req.headers.authorization;
    console.log(token);
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
      console.log(token);
    }
    console.log(token);

    if (!token) {
      throw new AppError(404, 'not Authorized');
    }

    const decoded: any = jwt.verify(
      token as string,
      config.jwt_access_token || 'secret',
    );
    console.log(decoded);
    const user = await User.findById(decoded.id);

    if (!user || user.isBlocked) {
      throw new AppError(404, 'not Authorized');
    }

    req.user = user; // Attach user to request object
    next();
  } catch (error: any) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
