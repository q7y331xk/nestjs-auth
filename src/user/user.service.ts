import {
  DefaultPromiseResponse,
  ResponseSuccess,
} from 'src/types/http-response.type';
import { Repository } from 'typeorm';
import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { catchHandler } from 'src/shared/throw-error-in-catch';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): DefaultPromiseResponse {
    try {
      const userNew = this.userRepository.create(createUserDto);
      const userSaved = await this.userRepository.save(userNew);
      return new ResponseSuccess(userSaved);
    } catch (err) {
      catchHandler(err);
    }
  }

  async findAll() {
    try {
      const usersExist = await this.userRepository.find();
      return new ResponseSuccess(usersExist);
    } catch (err) {
      catchHandler(err);
    }
  }

  async findOne(id: number): DefaultPromiseResponse {
    try {
      const userExist = await this.userRepository.findOne({ where: { id } });
      if (!userExist) throw 'user not found';
      return new ResponseSuccess(userExist);
    } catch (err) {
      catchHandler(err);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const userExist = await this.userRepository.findOne({ where: { id } });
      if (!userExist) {
        throw 'no user exist';
      }
      const userUpdate = await this.userRepository.update(
        userExist,
        updateUserDto,
      );
      return new ResponseSuccess(userUpdate);
    } catch (err) {
      catchHandler(err);
    }
  }

  async remove(id: number) {
    try {
      const userExist = await this.userRepository.findOne({ where: { id } });
      if (!userExist) {
        throw 'no user exist';
      }
      const userRemoved = await this.userRepository.remove(userExist);
      return new ResponseSuccess(userRemoved);
    } catch (err) {
      catchHandler(err);
    }
  }
}
