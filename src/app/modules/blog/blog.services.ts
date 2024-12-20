// import { Tblog } from "./blog.interface"
import { Tblog } from "./blog.interface";
import { Blog } from "./blog.model"


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

export const blogService = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlog,
};