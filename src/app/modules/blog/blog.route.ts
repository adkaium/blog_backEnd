import { Router } from "express";
import { blogController } from "./blog.controller";
import { auth } from "../../middlewares/auth";







const router = Router()

router.post('/create-blog',auth(), blogController.createBlog);


export const bolgRoute = router