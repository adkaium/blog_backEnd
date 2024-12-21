import { Router } from 'express';
import { userController } from './user.controller';


const router = Router();

router.post('/user/register', userController.createUser);
router.post(
  '/createAdmin',
  // auth(USER_ROLE.admin),
  userController.createAdmin,
);

router.post('login');

export const userRouter = router;
