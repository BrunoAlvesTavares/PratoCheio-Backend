import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserDocument } from '../src/users/entities/user.entity';
import { UsersService } from '../src/users/users.service';
import { UnauthorizedError } from './errors/unauthorized.error';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  //turn the user into a JWT
  async login(user: UserDocument): Promise<UserToken> {
    const payload: UserPayload = {
      sub: String(user._id),
      username: user.username,
      name: user.name,
      accessLevel: user.accessLevel,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
      currentUser: payload,
    };
  }

  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.userService.findByUsername(email);
    if (user) {
      // check if the password provided matches the stored password
      if (password === user.password) {
        return user;
      }
    }

    throw new UnauthorizedError(
      'Email address or password provided is incorrect.',
    );
  }
}
