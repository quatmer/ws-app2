import { config } from './../config';
import * as jwt from 'jsonwebtoken';

export interface TokenParams {
  userId: string;
  username: string;
}

const createToken = (payload: TokenParams): string => {
  const { userId, username } = payload;

  const token = jwt.sign({ userId: userId, username: username }, config.jwtSecretKey, {
    expiresIn: config.jwtTokenExpiresIn,
  });
  return token;
};

const resolveToken = (token: string): TokenParams => {
  return jwt.verify(token, config.jwtSecretKey) as TokenParams;
};

export const JWT = {
  resolveToken,
  createToken,
};
