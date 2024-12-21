import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  jwt_access_token: process.env.JWT_ACCESS_SECRET,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_refresh_token: process.env.JWT_REFRESH_SECRET,
  jwt_access_expire_in: process.env.JWT_ACCESS_EXPIRE_IN,
  jwt_refresh_expire: process.env.JWT_REFRESH_EXPIRE_IN,
  node_env: process.env.NODE_ENV,
  default_password: process.env.DEFAULT_PASSWORD,
};
