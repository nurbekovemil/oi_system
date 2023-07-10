import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { Token } from './entities/token.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Token]), JwtModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
