import { TokenUser } from './../types/shared.type';
import { SignInUserDto } from './dto/sign-in-user.dto';
import {
  DefaultPromiseResponse,
  ResponseSuccess,
} from 'src/types/http-response.type';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { catchHandler } from 'src/shared/throw-error-in-catch';
import { PwCode } from './entities/pw-code.entity';
import { AuthService } from 'src/auth/auth.service';
import { getSalt, passswordEncrypt } from './funcs/pw-hash';
import { odenSignIn } from './funcs/sign-in';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(PwCode)
    private readonly pwCodesRepository: Repository<PwCode>,
    private readonly authService: AuthService,
  ) {}

  async signUp(createUserDto: CreateUserDto): DefaultPromiseResponse {
    try {
      const { password } = createUserDto;
      const salt = getSalt();
      const passwordHashed = passswordEncrypt(password, salt);
      const userNew = this.userRepository.create({
        ...createUserDto,
        password: passwordHashed,
        salt,
      });
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
      const { authType, name, password } = signInUserDto;
      switch (authType) {
        case 0:
          return odenSignIn({
            userRepository: this.userRepository,
            authService: this.authService,
            name,
            password,
          });
        default:
          throw 'no authType';
      }
    } catch (err) {
      catchHandler(err);
    }
  }

  async removeMe(user: TokenUser): DefaultPromiseResponse {
    try {
      const userExist = await this.userRepository.findOne({
        where: { id: user.id },
      });
      const userRemoved = await this.userRepository.remove(userExist);
      return new ResponseSuccess({ removed: true });
    } catch (err) {
      catchHandler(err);
    }
  }
}
