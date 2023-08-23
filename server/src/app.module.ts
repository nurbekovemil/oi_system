import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { CompaniesModule } from './companies/companies.module';
import { ReportsModule } from './reports/reports.module';
import { TokenModule } from './token/token.module';
import { Report } from './reports/entities/report.entity';
import { Company } from './companies/entities/company.entity';
import { Token } from './token/entities/token.entity';
import { CompanyTemplates } from './companies/entities/company-templates.entity';
import { ReportTypes } from './reports/entities/report-types.entity';
import { ReportTemplates } from './reports/entities/report-templates.entity';
import { ReportStatus } from './reports/entities/report-status.entity';
import { ReportGroups } from './reports/entities/report-groups.entity';
import { FilesService } from './files/files.service';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      models: [
        User,
        Report,
        ReportTemplates,
        ReportStatus,
        ReportTypes,
        ReportGroups,
        Company,
        CompanyTemplates,
        Token,
      ],
      autoLoadModels: true,
      timezone: '+06:00',
      synchronize: true,
    }),
    CompaniesModule,
    ReportsModule,
    UsersModule,
    AuthModule,
    TokenModule,
    FilesModule,
  ],
  controllers: [],
  providers: [FilesService],
})
export class AppModule {}
