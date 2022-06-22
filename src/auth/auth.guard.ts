import { jwtConstant } from './../secret/jwt.secret';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 토큰 정보가 아예 없거나, 정상적일 때만 진행
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const { authorization } = req.headers;

    if (authorization) {
      req.user = this.validateToken(authorization);
      const user = await this.userRepository.findOne({
        where: { id: req.user.id },
      });

      // 만약 비밀번호 변경이 발생하였으면 기존 토큰 만료 처리
      if (
        user.passwordVersion &&
        user.passwordVersion !== req.user.passwordVersion
      ) {
        throw new HttpException(
          '비밀번호가 변경되었습니다.',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
    return true;
  }

  // 토큰 검증
  validateToken(token: string): jwt.JwtPayload | string {
    try {
      return jwt.verify(token, jwtConstant.secret);
    } catch ({ message }) {
      switch (message) {
        case 'invalid token':
        case 'jwt malformed': {
          throw new HttpException(
            '유효하지 않은 토큰입니다.',
            HttpStatus.UNAUTHORIZED,
          );
        }
        case 'jwt expired': {
          throw new HttpException('토큰이 만료되었습니다.', HttpStatus.GONE);
        }
        default: {
          throw new HttpException('기타', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    }
  }
}