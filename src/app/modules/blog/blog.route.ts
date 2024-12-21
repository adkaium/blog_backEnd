import { Router } from 'express';
import { blogController } from './blog.controller';
import { auth } from '../../middlewares/auth';

const router = Router();

router.post('/create-blog', auth, blogController.createBlog);
router.patch('/update/:id', auth, blogController.updateBlog);
router.delete('/deleted/:id', auth, blogController.deleteBlog);
router.get('/all-blog', blogController.getAllBlogs);

export const bolgRoute = router;
