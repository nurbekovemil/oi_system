import { CreateUserDto } from './dto/create-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { Company } from 'src/companies/entities/company.entity';
import { Sequelize } from 'sequelize';
import { UserTemp } from './entities/user-temp.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/roles/entities/role.entity';
import { RolesService } from 'src/roles/roles.service';
import { ChangePasswordDto } from './dto/change-password.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Roles) private roleRepository: typeof Roles,
    @InjectModel(UserTemp) private userTempRepository: typeof UserTemp,
    @InjectModel(Company) private companyRepository: typeof Company,
    private roleService: RolesService,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    try {
      const condidate = await this.userRepository.findOne({
        where: {
          login: createUserDto.login,
        },
      });
      if (condidate) {
        throw new HttpException(
          { message: `Пользователь ${createUserDto.login} уже существует` },
          HttpStatus.BAD_REQUEST,
        );
      }
      const hashPassword = await bcrypt.hash(createUserDto.password, 3);
      const { roleId, password, ...rest } = createUserDto;
      const user = await this.userRepository.create({
        ...rest,
        password: hashPassword,
      });
      await this.roleService.createRole({ roleId, userId: user.id });
      return { id: user.id };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  async getUserByLogin(login: string) {
    return await this.userRepository.findOne({
      where: { login },
      // include: { all: true },
      include: [
        {
          model: this.roleRepository,
          attributes: {
            exclude: ['updatedAt', 'createdAt'],
          },
        },
      ],
    });
  }
  async findUserByPk(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      // include: { all: true },
      include: [
        {
          model: this.roleRepository,
          attributes: {
            exclude: ['updatedAt', 'createdAt'],
          },
        },
      ],
    });
  }
  async getTemplate(form_type: string) {
    return await this.userTempRepository.findOne({
      where: { form_type },
    });
  }
  async getUserPasswordForCompare(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      attributes: {
        include: ['password'],
      },
    });
  }
  async updateUser(updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findByPk(updateUserDto.id);
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
    // Update the user's attributes with the new data
    const { roleId, ...rest } = updateUserDto;
    Object.assign(user, rest);
    await this.roleService.updateRole({ roleId, userId: user.id });
    // Save the updated user in the database
    await user.save();
    return user;
  }
  async updateUserPassword(changePasswordDto: ChangePasswordDto) {
    const user = await this.userRepository.findByPk(changePasswordDto.userId);
    if (
      user &&
      (await bcrypt.compare(changePasswordDto.confirmPassword, user.password))
    ) {
      const hashPassword = await bcrypt.hash(changePasswordDto.password, 3);
      user.password = hashPassword;
      await user.save();
      return;
    }
    throw new HttpException('Неверный пароль', HttpStatus.BAD_REQUEST);
  }

  async findAll({ page, limit }) {
    const offset = (page - 1) * limit;
    return await this.userRepository.findAndCountAll({
      include: [
        {
          model: this.companyRepository,
          attributes: ['name', 'id'],
        },
      ],
      attributes: ['id', 'login'],
      order: [['login', 'ASC']],
      limit,
      offset,
    });
  }
  async deleteUser({ id }: { id: number }) {
    const user = await this.userRepository.destroy({ where: { id } });
    return user;
  }
  async resetUserPass({ userId }) {
    const user = await this.userRepository.findByPk(userId);
    const hashPassword = await bcrypt.hash('123', 3);
    user.password = hashPassword;
    await user.save();
  }
}
