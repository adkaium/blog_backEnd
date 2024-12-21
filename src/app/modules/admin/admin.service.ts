import { Blog } from "../blog/blog.model";
import { User } from "../user/user.model";

/**
 * Block a user by ID.
 * @param userId - The ID of the user to block.
 */
 const blockUserService = async (userId: string) => {
  const blockUser= User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true }
  );
  return blockUser
};
 


/**
 * Delete a blog by ID.
 * @param blogId - The ID of the blog to delete.
 */
 const deleteAnyBlogService = async (blogId: string) => {
  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new Error("Blog not found");
  }

  await blog.deleteOne();

  return blog;
};


export const AdminService = {
    blockUserService,
  deleteAnyBlogService,
};
