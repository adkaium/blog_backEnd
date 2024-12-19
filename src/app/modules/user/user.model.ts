import { model, Schema } from "mongoose";
import { Tuser } from "./user.interface";

const userSchema = new Schema<Tuser>(
    {
        name:{
            type:String,
            required:true,
            trim:true,
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
        },
        role:{
            type:String,
            enum:["admin","user"],
            default:"user"
        },
        isBlocked:{
            type:Boolean,
            default:false,
        },
    },
    {timestamps:true}
);

export const User = model<Tuser>("User",userSchema)