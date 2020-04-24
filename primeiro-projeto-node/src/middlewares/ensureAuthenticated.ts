import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';


interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}
export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
  ): void{

    const AuthHeader = request.headers.authorization;

    if (!AuthHeader) {
      throw new Error('JWT token is missing');
    }
    const [, token] = AuthHeader.split(' ');

    try {
      const decoded = verify(token, authConfig.jwt.secret);
      const { sub } = decoded as TokenPayload;

      request.user = {
        id: sub,
      };

      return next();
    } catch (err) {
      throw new Error('Invalid JWT token');
    }
}
