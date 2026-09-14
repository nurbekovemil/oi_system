import { UsersModule } from '../users/users.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TokenModule } from 'src/token/token.module';
import { CompaniesModule } from 'src/companies/companies.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { TokenChallenge } from './entities/token-challenge.entity';

@Module({
  imports: [
    JwtModule,
    UsersModule,
    TokenModule,
    CompaniesModule,
    SequelizeModule.forFeature([TokenChallenge]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
