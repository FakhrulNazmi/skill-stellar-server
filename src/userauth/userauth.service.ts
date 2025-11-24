import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserAuth } from 'src/userauth/entities/userauth.entity';
import { CreateUserAuthDto } from './dto/create-userauth.dto';
import { UpdateUserDto } from './dto/update-userauth.dto';

@Injectable()
export class UserauthService {
  constructor(
    @InjectRepository(UserAuth)
    private readonly userAuthRepository: Repository<UserAuth>,
  ) {}

  // --- CREATE ---
  async createUserAuth(dto: CreateUserAuthDto) {
    const existing = await this.userAuthRepository.findOne({
      where: { username: dto.username },
    });
    if (existing) {
      throw new ConflictException('Username already exists');
    }

    const password_hash = await bcrypt.hash(dto.password, 10);

    const userAuth = this.userAuthRepository.create({
      user_id: dto.user_id,
      username: dto.username,
      password_hash,
    });

    return this.userAuthRepository.save(userAuth);
  }

  // --- FIND BY USERNAME ---
  async findOne(username: string): Promise<UserAuth | null> {
    return this.userAuthRepository.findOne({ where: { username } });
  }

  // --- FIND BY ID ---
  async findOneById(id: string): Promise<UserAuth> {
    const user = await this.userAuthRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // --- UPDATE ---
  async update(id: string, updateDto: UpdateUserDto): Promise<UserAuth> {
    const user = await this.findOneById(id);

    // Hash password if it exists in update
    if (updateDto.password_hash) {
      updateDto.password = await bcrypt.hash(updateDto.password_hash, 10);
      delete updateDto.password;
    }

    Object.assign(user, updateDto);
    return this.userAuthRepository.save(user);
  }
}
