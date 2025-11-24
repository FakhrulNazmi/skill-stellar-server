import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAuthDto } from './create-userauth.dto';
import { IsOptional } from 'class-validator'



export class UpdateUserDto extends PartialType(CreateUserAuthDto) {
    @IsOptional()
    password_hash?: string; // optional field to store hashed password
}
