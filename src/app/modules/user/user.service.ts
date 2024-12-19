import { Tuser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async(payload:Tuser)=>{
    const newUser = await User.create(payload)
    return newUser
}



export const UserServices = {
    createUserIntoDB
}