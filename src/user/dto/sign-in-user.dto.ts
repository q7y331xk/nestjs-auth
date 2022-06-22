import { User } from 'src/user/entities/user.entity';
import { PickType } from '@nestjs/mapped-types';

export class SignInUserDto extends PickType(User, [
  'authType',
  'name',
  'password',
]) {}
