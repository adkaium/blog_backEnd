import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRouter } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import { bolgRoute } from './app/modules/blog/blog.route';
import { AuthRoutes } from './app/modules/Auth/auth.route';
import { adminRoute } from './app/modules/admin/admin.route';
// import notFound from './app/middlewares/notFound';

const app: Application = express();
// const port = 3000;

// parsers
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api/v1', userRouter);
app.use('/api/blog', bolgRoute);
app.use('/api/auth', AuthRoutes);
app.use('/api/admin',adminRoute)

app.use(globalErrorHandler);
// app.use(notFound);
export default app;
