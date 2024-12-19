import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createUser = async(req:Request, res:Response) =>{
      
try{
const user = req.body;
   const result = await UserServices.createUserIntoDB(user)

    res.status(200).json({
      success: true,
      message: 'create user successfully',
      data: result,
    });
}catch(err){
    res.status(500).json({
        success:false,
        message:err,
        data:err,
    })
}

}

export const userController ={
    createUser
}