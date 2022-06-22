import { ResponseException } from './../types/http-response.type';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { stringFunc } from 'src/funcs/string';
import { adminUserConstant } from 'src/secret/admin-user.secret';
import { TokenUser } from 'src/types/shared.type';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // 토큰 발급
  signIn(id: number, name: string, passwordVersion: number): string {
    return this.jwtService.sign({ id, name, passwordVersion });
  }
}

export const isAdmin = (user: TokenUser) => {
  if (
    user &&
    stringFunc.compareOneWithMany(user.name, adminUserConstant.list)
  ) return true;
  throw new ResponseException(
    { unauthorized: 'admin' },
    'Forbidden',
    HttpStatus.FORBIDDEN,
  );
};