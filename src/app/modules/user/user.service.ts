/* eslint-disable @typescript-eslint/no-explicit-any */

// import mongoose from 'mongoose';
import mongoose from 'mongoose';
import config from '../../config';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import AppError from '../../errors/AppError';

// import AppError from '../../errors/AppError';

const createUserIntoDB = async (payload: TUser) => {
  // const {name,email,password} = payload
  const newUser = await User.create(payload);
  return newUser;
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'admin';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });
  
    //create a admin
    if (!newUser.length) {
      throw new AppError(401, 'Failed to create admin');
    }
    // set id , _id as user
    payload.user = newUser[0]._id; //reference _id
  
   

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });
  
    if (!newAdmin.length) {
      throw new AppError(401, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();
   
    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
export const UserServices = {
  createUserIntoDB,
  createAdminIntoDB,
};
