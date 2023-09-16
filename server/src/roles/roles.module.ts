import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Roles } from './entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { RoleUsers } from './entities/role-users.entity';

@Module({
  imports: [SequelizeModule.forFeature([Roles, User, RoleUsers])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
