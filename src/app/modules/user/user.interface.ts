export type Tuser = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
  createAt: Date;
  updateAt: Date;
};
