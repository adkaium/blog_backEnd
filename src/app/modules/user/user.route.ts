import { Router } from 'express';
import { userController } from './user.controller';

const router = Router();

router.post('/user/register', userController.createUser);
router.post('login');

export const userRouter = router;
