import { Router } from 'express';
import { adminMiddleware } from '../../middlewares/adminAuth';
import { AdminController } from './admin.cotroller';


const router = Router();

// Block a user
router.patch('/users/:userId/block', adminMiddleware,AdminController.blockUser);

// Delete a blog
router.delete('/blogs/:id', adminMiddleware, AdminController.deleteBlog);

export  const adminRoute = router;
