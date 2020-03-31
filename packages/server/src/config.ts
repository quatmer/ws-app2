import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: Number(process.env.PORT!),
};
