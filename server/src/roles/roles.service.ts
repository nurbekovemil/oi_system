import { Injectable } from '@nestjs/common';
import { RoleUsers } from './entities/role-users.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Roles } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Roles) private roleRepository: typeof Roles,
    @InjectModel(RoleUsers) private roleUsersRepository: typeof RoleUsers,
  ) {}
  async findAll() {
    const roles = await this.roleRepository.findAll({
      attributes: [
        ['id', 'value'],
        ['description', 'label'],
      ],
    });
    return roles;
  }
  async createRole(role) {
    return await this.roleUsersRepository.create(role);
  }
  async updateRole(role) {
    const userRole = await this.roleUsersRepository.findOne({
      where: {
        userId: role.userId,
      },
    });
    userRole.roleId = role.roleId;
    await userRole.save();
  }
}
