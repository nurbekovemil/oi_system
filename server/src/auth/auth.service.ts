import { TokenService } from './../token/token.service';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(
    private UsersService: UsersService,
    private TokenService: TokenService,
  ) {}
  async login(loginDto: LoginDto) {
    const user = await this.UsersService.getUserByLogin(loginDto.login);
    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      const tokens = await this.TokenService.generateToken({ userId: user.id });
      await this.TokenService.saveToken(user.id, tokens.refreshToken);
      return {
        user: {
          id: user.id,
          login: user.login,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        tokens,
      };
    }
    throw new UnauthorizedException({ message: `Incorrect login or password` });
  }
  async logout(refreshToken) {
    return await this.TokenService.removeToken(refreshToken);
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new HttpException(
        'User is not authorized',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const userData = await this.TokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await this.TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDB) {
      throw new HttpException(
        'User is not authorized',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const user = await this.UsersService.findUserByPk(userData.userId);
    const tokens = await this.TokenService.generateToken({ userId: user.id });
    await this.TokenService.saveToken(user.id, tokens.refreshToken);
    return {
      user: {
        id: user.id,
        login: user.login,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      tokens,
    };
  }
}
