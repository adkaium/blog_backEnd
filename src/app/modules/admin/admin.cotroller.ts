/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { AdminService } from './admin.service';



const blockUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const user = await AdminService.blockUserService(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        statusCode: 404,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'User blocked successfully',
      statusCode: 200,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      statusCode: 500,
      error: error.message,
    });
  }
};


 const deleteBlog = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  try {
    const blog = await AdminService.deleteAnyBlogService(id);

    if (!blog) {
      res.status(404).json({
        success: false,
        message: 'Blog not found',
        statusCode: 404,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
      statusCode: 200,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      statusCode: 500,
      error: error.message,
    });
  }
};


export const AdminController = {
  deleteBlog,
  blockUser,
};