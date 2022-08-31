import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { ExpressRequestInterface } from '@app/user/types/expressRequest.interface';
import { JWT_SECRET } from '@app/config/config';
import { UserService } from '@app/user/user.service';
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthMiddleware implements NestMiddleware{
  constructor(private readonly userService: UserService) {}

  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {

    if(!req.headers.authorization) {
      req.user = null;
      next();
      throw new HttpException('The access token is missing', HttpStatus.BAD_REQUEST);
    }
    const token = req.headers.authorization.split(' ')[1]

    try {
      const decode = jwt.verify(token, JWT_SECRET);
      const user = await this.userService.findById(decode.id)
      req.user = user;
      next();
    } catch (err) {
      req.user = null;
      next();
    }
  }
}
