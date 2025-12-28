import dotenv from 'dotenv';

if (process.env.SKIP_DOTENV !== '1') {
  dotenv.config();
}
