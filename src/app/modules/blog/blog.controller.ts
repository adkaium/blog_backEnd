/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { blogService } from './blog.services';
import AppError from '../../errors/AppError';

const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    // const userId = req.user?.id; // Assuming user ID is set in the middleware
    // console.log(userId);
    const blog = await blogService.createBlogIntoDB({
      title,
      content,
      author: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      statusCode: 201,
      data: blog,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      statusCode: 500,
      error: error.message,
    });
  }
};

const updateBlog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    const userId = req.user?._id;
    const updates = req.body;

    const updatedBlog = await blogService.updateBlogIntoDB(
      blogId,
      userId,
      updates,
    );

    if (!updatedBlog) {
      throw new AppError(404, 'Blog not found or unauthorized');
    }

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      statusCode: 200,
      data: updatedBlog,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      statusCode: 500,
      error: error.message,
    });
  }
};

const deleteBlog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    const userId = req.user?._id;

    const deletedBlog = await blogService.deleteBlog(blogId, userId);

    if (!deletedBlog) {
      throw new AppError(404, 'not found blog');
    }

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
      statusCode: 200,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      statusCode: 500,
      error: error.message,
    });
  }
};

export const blogController = {
  createBlog,
  updateBlog,
  deleteBlog,
};
