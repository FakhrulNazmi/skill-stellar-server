import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserauthService } from './userauth.service';
import { UserAuth } from './entities/userauth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAuth])],
  providers: [UserauthService],
  exports: [UserauthService], // required for AuthService
})
export class UserauthModule {}
 