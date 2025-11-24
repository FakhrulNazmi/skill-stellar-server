
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserauthService } from 'src/userauth/userauth.service';
import { CreateUserAuthDto } from 'src/userauth/dto/create-userauth.dto';
import { UpdateUserDto } from 'src/userauth/dto/update-userauth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userauthService: UserauthService,
    private jwtService: JwtService
  ) {}
  // --- REGISTER ---
  async register(dto: CreateUserAuthDto) {
    // Check if username exists
    const existing = await this.userauthService.findOne(dto.username);
    if (existing) throw new ConflictException('Username already exists');

    // Hash password
    const password_hash = await bcrypt.hash(dto.password, 10);

    // Create userauth record
    const userAuth = await this.userauthService.createUserAuth({
      ...dto,
      password: dto.password // UserauthService will hash again OR adjust
    });

    const { password_hash: _, ...result } = userAuth;
    return result;
  }
  // UPDATE
  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userauthService.update(id, updateUserDto);
    return this.userauthService.findOneById(id);
  }


  //login
  async login(username: string, password: string) {
    const userAuth = await this.userauthService.findOne(username);
    if (!userAuth) throw new UnauthorizedException('Invalid username/password');

    const isValid = await bcrypt.compare(password, userAuth.password_hash);
    if (!isValid) throw new UnauthorizedException('Invalid username/password');

    const payload = { sub: userAuth.user_id, username: userAuth.username };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }
}
