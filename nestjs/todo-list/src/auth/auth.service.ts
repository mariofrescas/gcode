import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { UserEntity } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  public getToken(user: UserEntity): string {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

  public async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.usersService.findByEmail(email);

    if (!user || user.password !== password) {
      return null;
    }

    return user;
  }
}
