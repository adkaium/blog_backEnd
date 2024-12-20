/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { blogService } from "./blog.services";



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
  } catch (error :any) {
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
};