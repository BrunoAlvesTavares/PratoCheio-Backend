import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly reflector: Reflector) {}

  use(req: Request, res: Response, next: NextFunction) {
    const isPublic = this.reflector.get<boolean>('isPublic', req.route);
    if (isPublic) {
      // Se a rota é pública, não aplicar autenticação
      return next();
    }
    next();
  }
}
