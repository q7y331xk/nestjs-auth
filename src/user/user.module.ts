import { AuthModule } from './../auth/auth.module';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PwCode } from './entities/pw-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, PwCode]), AuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
