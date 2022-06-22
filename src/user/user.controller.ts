import { AuthGuard } from './../auth/auth.guard';
import { DefaultPromiseResponse } from '../types/http-response.type';
import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { Token } from 'src/shared/user.decorator';
import { TokenUser } from 'src/types/shared.type';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  signUp(@Body() createUserDto: CreateUserDto): DefaultPromiseResponse {
    return this.userService.signUp(createUserDto);
  }

  @Get('name')
  async findOneByName(@Query('name') name: string): DefaultPromiseResponse {
    return this.userService.findOneByName(name);
  }

  @Post('sign-in')
  async signIn(@Body() signInUserDto: SignInUserDto): DefaultPromiseResponse {
    return this.userService.signIn(signInUserDto);
  }

  @Delete('me')
  @UseGuards(AuthGuard)
  async removeMe(@Token() user: TokenUser) {
    return this.userService.removeMe(user);
  }
}
