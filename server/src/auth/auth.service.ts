import { CompaniesService } from './../companies/companies.service';
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
import { RutokenDto } from './dto/rutoken.dto';
import { EdsDto } from './dto/eds.dto';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private UsersService: UsersService,
    private CompaniesService: CompaniesService,
    private TokenService: TokenService,
  ) {}
  async login(loginDto: LoginDto) {
    try {
      const user = await this.UsersService.getUserByLogin(loginDto.login);
      if (user && (await bcrypt.compare(loginDto.password, user.password))) {
        const tokens = await this.TokenService.generateToken({
          userId: user.id,
          companyId: user.companyId,
          roles: user.roles,
        });
        await this.TokenService.saveToken(user.id, tokens.refreshToken);
  
        return {
          user: {
            id: user.id,
            login: user.login,
            firstName: user.firstName,
            lastName: user.lastName,
            roles: user.roles,
            inn: user.inn,
            companyId: user.companyId,
            changePass: await bcrypt.compare(
              process.env.DEFAULT_PASS,
              user.password,
            ),
          },
          tokens,
        };
      }
      throw new UnauthorizedException({ message: 'Неверный логин или пароль' });
    } catch (error) {
      throw new HttpException(
        error,
        HttpStatus.BAD_REQUEST,
      );
    }
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
    const tokens = await this.TokenService.generateToken({
      userId: user.id,
      companyId: user.companyId,
      roles: user.roles,
    });
    await this.TokenService.saveToken(user.id, tokens.refreshToken);
    return {
      user: {
        id: user.id,
        login: user.login,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
        inn: user.inn,
        companyId: user.companyId,
        changePass: await bcrypt.compare(
          process.env.DEFAULT_PASS,
          user.password,
        ),
      },
      tokens,
    };
  }
  async rutoken(rutokenDto: RutokenDto){
    try {
      const company = await this.CompaniesService.getCompanyByInn(rutokenDto.company_inn)
      if(!company){
        throw new Error('ИНН компании не найдено');
      }
      const user = await this.UsersService.getUserByCompanyId(company.id, rutokenDto.user_inn)
      if(!user){
        throw new Error('ИНН пользователя не найдено');
      }
      const tokens = await this.TokenService.generateToken({
        userId: user.id,
        companyId: user.companyId,
        roles: user.roles,
      });
      await this.TokenService.saveToken(user.id, tokens.refreshToken);
  
      return {
        user: {
          id: user.id,
          login: user.login,
          firstName: user.firstName,
          lastName: user.lastName,
          roles: user.roles,
          inn: user.inn,
          companyId: user.companyId,
          changePass: await bcrypt.compare(
            process.env.DEFAULT_PASS,
            user.password,
          ),
        },
        tokens,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async cloudEdsSendPinCode(edsDto: EdsDto){
    try {
      const edsAccessToken = process.env.EDS_ACCESS_TOKEN;
      const url = 'https://cdsapi.srs.kg/api/get-pin-code';

      const user = await this.UsersService.getUserByInn(edsDto.user_inn)
      if(!user){
          throw new HttpException(
            'ИНН пользователя не найдено',
            HttpStatus.BAD_REQUEST,
          );
      }
      const company = await this.CompaniesService.findOne(user.companyId)
      if(!company){
        throw new HttpException(
          'Организация не найдено',
          HttpStatus.BAD_REQUEST,
        );
      }
      const response = await axios.post(
        url,
        {
          personIdnp: edsDto.user_inn,
          organizationInn: company.inn,
          method: 'email',
        },
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: `Bearer ${edsAccessToken}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async cloudEdsConfirmPinCode(edsDto: EdsDto){
    try {
      const edsAccessToken = process.env.EDS_ACCESS_TOKEN;
      const url = 'https://cdsapi.srs.kg/api/account/auth';
      const user = await this.UsersService.getUserByInn(edsDto.user_inn)
      const company = await this.CompaniesService.findOne(user.companyId)
      await axios.post(
        url,
        {
          personIdnp: edsDto.user_inn,
          organizationInn: company.inn,
          byPin: edsDto.pin,
        },
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: `Bearer ${edsAccessToken}`,
          },
        },
      );
      const tokens = await this.TokenService.generateToken({
        userId: user.id,
        companyId: user.companyId,
        roles: user.roles,
      });
      await this.TokenService.saveToken(user.id, tokens.refreshToken);
      return {
        user: {
          id: user.id,
          login: user.login,
          firstName: user.firstName,
          lastName: user.lastName,
          roles: user.roles,
          inn: user.inn,
          companyId: user.companyId,
          changePass: await bcrypt.compare(
            process.env.DEFAULT_PASS,
            user.password,
          ),
        },
        tokens,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
