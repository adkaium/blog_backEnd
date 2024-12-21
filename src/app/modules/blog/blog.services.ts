/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Tblog } from "./blog.interface"
import { Tblog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (blogData: Partial<Tblog>): Promise<Tblog> => {
  const blog = new Blog(blogData);
  return await blog.save();
};

// // update a blog
export const updateBlogIntoDB = async (
  blogId: string,
  userId: string,
  updates: Partial<Tblog>,
): Promise<Tblog | null> => {
  return await Blog.findOneAndUpdate({ _id: blogId, author: userId }, updates, {
    new: true,
  });
};

const deleteBlog = async (
  blogId: string,
  userId: string,
): Promise<Tblog | null> => {
  return await Blog.findOneAndDelete({ _id: blogId, author: userId });
};
//  get all blog by serchig
const getAllBlogsIntoDB = async (
  search: string | undefined,
  sortBy: string = 'createdAt',
  sortOrder: string = 'desc',
  filter: string | undefined,
): Promise<Tblog[]> => {
  const query: any = {};
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];
  }
  if (filter) {
    query.author = filter;
  }

  const sortOptions: any = {};
  sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

  return await Blog.find(query)
    .sort(sortOptions)
    .populate('author', 'name email');
};

export const blogService = {
  createBlogIntoDB,
  getAllBlogsIntoDB,
  updateBlogIntoDB,
  deleteBlog,
};
