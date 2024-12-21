/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserServices } from './user.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendRespons';


const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    const result = await UserServices.createUserIntoDB(user);

    res.status(201).json({
      success: true,
      message: 'create user successfully',
      data: { _id: result?._id, name: result?.name, email: result?.email },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.message,
      data: err,
    });
  }
};
const createAdmin = catchAsync(async (req, res) => {
  const { password,  adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Admin is created succesfully',
    data: { _id: result?._id, name: result?.name, email: result?.email },
  });
});

export const userController = {
  createUser,
  createAdmin,
};
