import { model, Schema } from 'mongoose';
import { Tblog } from './blog.interface';

const blogSchema = new Schema<Tblog>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Blog = model<Tblog>('Blog', blogSchema);
