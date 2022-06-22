import { TokenUser } from './../types/shared.type';
import { SignInUserDto } from './dto/sign-in-user.dto';
import {
  DefaultPromiseResponse,
  ResponseSuccess,
} from 'src/types/http-response.type';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { catchHandler } from 'src/shared/throw-error-in-catch';
import { PwCode } from './entities/pw-code.entity';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(PwCode)
    private readonly pwCodesRepository: Repository<PwCode>,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto): DefaultPromiseResponse {
    try {
      const userNew = this.userRepository.create(createUserDto);
      const userSaved = await this.userRepository.save(userNew);
      return new ResponseSuccess({ created: true });
    } catch (err) {
      catchHandler(err);
    }
  }

  async findOneByName(name: string): DefaultPromiseResponse {
    try {
      const userExist = await this.userRepository.findOne({ where: { name } });
      return new ResponseSuccess({ exist: true });
    } catch (err) {
      catchHandler(err);
    }
  }

  async signIn(signInUserDto: SignInUserDto): DefaultPromiseResponse {
    try {
      const { authType } = signInUserDto;
      switch (authType) {
        case 0:
          const userExist = await this.userRepository.findOne({
            where: signInUserDto,
          });
          if (!userExist) throw 'user not found';
          const { id, name, passwordVersion } = userExist;
          const accessToken = this.authService.signIn(
            id,
            name,
            passwordVersion,
          );
          return new ResponseSuccess(accessToken);
        default:
          throw 'no authType';
      }
    } catch (err) {
      catchHandler(err);
    }
  }

  async removeMe(user: TokenUser): DefaultPromiseResponse {
    try {
      console.log(user);
      const userExist = await this.userRepository.findOne({
        where: { id: user.id },
      });
      // const userRemoved = await this.userRepository.remove(userExist);
      // return new ResponseSuccess(userRemoved);
      return new ResponseSuccess();
    } catch (err) {
      catchHandler(err);
    }
  }
}
