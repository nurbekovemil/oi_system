import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from './entities/token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token) private tokenRepository: typeof Token,
    private JwtService: JwtService,
  ) {}
  async generateToken(dto: CreateTokenDto) {
    const accessToken = await this.JwtService.sign(dto, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '8h',
    });
    const refreshToken = await this.JwtService.sign(dto, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '30d',
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await this.tokenRepository.findOne({ where: { userId } });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await this.tokenRepository.create({ userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await this.tokenRepository.destroy({
      where: { refreshToken },
    });
    return tokenData;
  }

  async findToken(refreshToken: string) {
    const token = await this.tokenRepository.findOne({
      where: { refreshToken },
    });
    return token;
  }

  validateAccessToken(token) {
    try {
      const userData = this.JwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      return userData;
    } catch (error) {
      return null;
    }
  }

  async validateRefreshToken(token) {
    try {
      const userData = await this.JwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      return userData;
    } catch (error) {
      return null;
    }
  }
}
