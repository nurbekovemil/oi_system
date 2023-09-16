import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { User } from 'src/users/entities/user.entity';
import { RoleUsers } from './entities/role-users.entity';

@Injectable()
export class RolesService {
  async create() {
    // try {
    //   const userIds = await User.findAll({ attributes: ['id'] }); // Retrieve userIds from the 'User' table
    //   for (const user of userIds) {
    //     // Insert a row into 'RoleUsers' for each userId
    //     await RoleUsers.create({
    //       roleId: 3, // Fixed roleId
    //       userId: user.id,
    //     });
    //   }
    //   console.log('Rows inserted successfully');
    //   return 'Rows inserted successfully';
    // } catch (error) {
    //   console.error('Error inserting rows:', error);
    // }
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
