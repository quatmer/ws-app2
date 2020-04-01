import { HttpError } from './../util/HttpError';
import { UserEntity } from './../entities/user.entity';
import { JWT, TokenParams } from './../util/JwtHelper';
import { Request, Response, NextFunction } from 'express';

export const checkAuthentication = async (req: Request, res: Response, next: NextFunction) => {
  let tokenParams: TokenParams;

  // Get the token from the head
  const token = <string>req.headers['auth'];

  // Try to validate token and get data
  try {
    tokenParams = JWT.verifyToken(token);
    res.locals.tokenParams = tokenParams;

    // Getting user entity
    const user = await UserEntity.findById(tokenParams.userId);
    if (user) {
      req.body.currentUser = user;
    } else {
      next(new HttpError('user not found'));
      return;
    }
  } catch (error) {
    console.log('Token is not valid,', error);
    next(new HttpError('Token is not valid'));
    return;
  }

  // Send new token on every request
  const newToken = JWT.createToken(tokenParams);
  res.setHeader('auth', newToken);

  next();
};
