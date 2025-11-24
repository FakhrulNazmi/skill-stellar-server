import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // CREATE
  async create(createUserDto: CreateUserDto) {
    const { email, phone, internal_id } = createUserDto;

    // Email exists?
    if (email) {
      const userEmail = await this.usersRepository.findOne({ where: { email } });
      if (userEmail) throw new ConflictException('Email already exists');
    }

    // Phone exists?
    if (phone) {
      const userPhone = await this.usersRepository.findOne({ where: { phone } });
      if (userPhone) throw new ConflictException('Phone already exists');
    }

    // Internal ID exists?
    if (internal_id) {
      const userInternal = await this.usersRepository.findOne({
        where: { internal_id },
      });
      if (userInternal) throw new ConflictException('Lecturer/Student No already exists');
    }

    // Save user
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  // READ ALL
  async findAll() {
    return await this.usersRepository.find();
  }

  // READ ONE
  async findOne(id: number) {
    return await this.usersRepository.findOne({
      where: { id },
    });
  }

  // UPDATE
  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  // DELETE
  async remove(id: number) {
    await this.usersRepository.delete(id);
    return { message: `User #${id} removed` };
  }
}
