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
        throw new HttpException(
          'ИНН компании не найдено',
          HttpStatus.BAD_REQUEST,
        );
      }
      const user = await this.UsersService.getUserByCompanyId(company.id, rutokenDto.user_inn)
      if(!user){
        throw new HttpException(
          'ИНН пользователя не найдено',
          HttpStatus.BAD_REQUEST,
        );
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
        error.response.data,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async cloudEdsSendPinCode(edsDto: EdsDto){
    try {
      const edsAccessToken = process.env.EDS_ACCESS_TOKEN;
      const url = 'https://cdsapi.srs.kg/api/get-pin-code';
      const company = await this.CompaniesService.getCompanyByInn(edsDto.company_inn)
      if(!company){
        throw new HttpException(
          'ИНН организации не найдено',
          HttpStatus.BAD_REQUEST,
        );
      }
      const user = await this.UsersService.getUserByCompanyId(company.id, edsDto.user_inn)
      if(!user){
          throw new HttpException(
            'ИНН пользователя не найдено',
            HttpStatus.BAD_REQUEST,
          );
      }
      const response = await axios.post(
        url,
        {
          personIdnp: edsDto.user_inn,
          organizationInn: edsDto.company_inn,
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
      await axios.post(
        url,
        {
          personIdnp: edsDto.user_inn,
          organizationInn: edsDto.company_inn,
          byPin: edsDto.pin,
        },
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: `Bearer ${edsAccessToken}`,
          },
        },
      );
      const company = await this.CompaniesService.getCompanyByInn(edsDto.company_inn)
      const user = await this.UsersService.getUserByCompanyId(company.id, edsDto.user_inn)
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
