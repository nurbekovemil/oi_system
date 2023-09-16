import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Company } from 'src/companies/entities/company.entity';
import { Report } from 'src/reports/entities/report.entity';
import { UserTemp } from './entities/user-temp.entity';
import { Roles } from 'src/roles/entities/role.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([User, UserTemp, Company, Report, Roles]),
    JwtModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
