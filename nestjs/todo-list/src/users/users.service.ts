import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  public async findByEmail(email: string): Promise<UserEntity> {
    const users = await this.userRepository.find({
      where: { email: email }
    });

    if (users.length !== 1) {
      return null;
    }

    return users[0];
  }
}
