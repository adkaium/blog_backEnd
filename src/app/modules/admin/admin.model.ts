import { model, Schema } from 'mongoose';
import { AdminModel, TAdmin } from './admin.interface';

const adminSchema = new Schema<TAdmin>({
  id:{
    type:String
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
   
  },
  name: {
    type: String,
    trim: true,
   
  },
  email: {
    type: String,
    unique: true,
   
  },
  password: {
    type: String,
    required: true,
  },
});
adminSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Admin.findOne({ id });
  return existingUser;
};
export const Admin = model<TAdmin, AdminModel>('Admin', adminSchema);
