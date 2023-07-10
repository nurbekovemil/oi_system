import { CreateUserDto } from './dto/create-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { Company } from 'src/companies/entities/company.entity';
import { Sequelize } from 'sequelize';
import { UserTemp } from './entities/user-temp.entity';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(UserTemp) private userTempRepository: typeof UserTemp,
    @InjectModel(Company) private companyRepository: typeof Company,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    const condidate = await this.userRepository.findOne({
      where: {
        login: createUserDto.login,
      },
    });
    if (condidate) {
      throw new HttpException(
        { message: `User ${createUserDto.login} already exists` },
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(createUserDto.password, 3);
    const user = await this.userRepository.create({
      ...createUserDto,
      password: hashPassword,
    });
    return { id: user.id };
  }
  async getUserByLogin(login: string) {
    return await this.userRepository.findOne({
      where: { login },
    });
  }
  async findUserByPk(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      attributes: {
        exclude: ['login', 'password', 'createdAt', 'updatedAt'],
      },
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
    Object.assign(user, updateUserDto);

    // Save the updated user in the database
    await user.save();
    return user;
  }
  async findAll() {
    return await this.userRepository.findAll({
      include: [
        {
          model: this.companyRepository,
          attributes: ['name', 'id'],
        },
      ],
      attributes: ['id', 'firstName'],
    });
  }

  async deleteUser({ id }: { id: number }) {
    const user = await this.userRepository.destroy({ where: { id } });
    return user;
  }
}
