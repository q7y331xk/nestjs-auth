import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { ResponseSuccess } from "src/types/http-response.type";
import { passswordEncrypt } from "./pw-hash";
import { User } from '../entities/user.entity';
import { catchHandler } from 'src/shared/throw-error-in-catch';

interface OdenSignIn {
  userRepository: Repository<User>;
  authService: AuthService;
  name: string;
  password: string;
}

export const odenSignIn = async ({
  userRepository,
  authService,
  name,
  password,
}: OdenSignIn) => {
  try {
    const userExist = await userRepository.findOne({
      where: { name },
    });
    if (!userExist) throw 'username not found';
    const {
      id,
      name: existName,
      passwordVersion,
      salt,
      password: existPassword,
    } = userExist;
    if (passswordEncrypt(password, salt) != existPassword) {
      throw 'userpassword wrong';
    }
    const accessToken = authService.signIn(id, existName, passwordVersion);
    return new ResponseSuccess(accessToken);
  } catch (err) {
    catchHandler(err);
  }
};
