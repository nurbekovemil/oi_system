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
import { randomBytes, randomUUID } from 'crypto';
import { InjectModel } from '@nestjs/sequelize';
import { RutokenDto } from './dto/rutoken.dto';
import { EdsDto } from './dto/eds.dto';
import { LoginTokenDto } from './dto/login-token.dto';
import { TokenChallenge } from './entities/token-challenge.entity';
import axios from 'axios';
import { cdsHttpsAgent } from '../eds/cds-https.agent';

const TOKEN_CHALLENGE_TTL_MS = 5 * 60 * 1000;

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(TokenChallenge)
    private tokenChallengeRepository: typeof TokenChallenge,
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
          httpsAgent: cdsHttpsAgent,
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
          httpsAgent: cdsHttpsAgent,
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

  async createTokenChallenge() {
    const id = randomUUID();
    const nonce = randomBytes(32).toString('base64');
    await this.tokenChallengeRepository.create({
      id,
      nonce,
      expiresAt: new Date(Date.now() + TOKEN_CHALLENGE_TTL_MS),
    });
    return { challengeId: id, nonce };
  }

  async loginToken(dto: LoginTokenDto) {
    try {
      if (dto.tokenKind !== 'jacarta' && dto.tokenKind !== 'enotoken') {
        throw new Error('Неизвестный тип токена');
      }
      await this.consumeTokenChallenge(dto.challengeId, dto.signature);
      const user = await this.resolveTokenUser(dto);
      return this.issueSession(user);
    } catch (error) {
      throw new HttpException(
        error.message || 'Ошибка входа по токену',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async consumeTokenChallenge(challengeId: string, signature: string) {
    if (!challengeId || !String(signature || '').trim()) {
      throw new Error('Подпись challenge не получена');
    }
    const challenge = await this.tokenChallengeRepository.findByPk(challengeId);
    if (!challenge) {
      throw new Error('Challenge не найден');
    }
    if (challenge.usedAt) {
      throw new Error('Challenge уже использован');
    }
    if (challenge.expiresAt.getTime() < Date.now()) {
      throw new Error('Challenge истёк, повторите вход');
    }
    challenge.usedAt = new Date();
    await challenge.save();
  }

  private digits(value: unknown) {
    return String(value ?? '').replace(/\D/g, '');
  }

  private isValidInn(value: unknown) {
    const inn = this.digits(value);
    if (!inn || /^0+$/.test(inn) || /^(\d)\1+$/.test(inn)) return false;
    if (inn.length === 12) return false;
    return inn.length === 14 || inn.length === 10;
  }

  private async resolveTokenUser(dto: LoginTokenDto) {
    const userInn = this.digits(dto.user_inn);
    const companyInn = this.digits(dto.company_inn);
    if (!this.isValidInn(userInn)) {
      throw new Error('ПИН/ИНН пользователя не найден в сертификате');
    }

    if (!this.isValidInn(companyInn)) {
      throw new Error('ИНН компании не найден в сертификате');
    }
    const company =
      (await this.CompaniesService.getCompanyByInn(companyInn)) ||
      (await this.CompaniesService.getCompanyByInnLoose(companyInn));
    if (!company) {
      throw new Error('ИНН компании не найдено');
    }
    const user = await this.UsersService.getUserByCompanyId(
      company.id,
      userInn,
    );
    if (!user) {
      throw new Error('ИНН пользователя не найдено');
    }
    return user;
  }

  private async issueSession(user) {
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
}
