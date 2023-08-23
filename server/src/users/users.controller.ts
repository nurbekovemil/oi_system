import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';

// @UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Put()
  updateCompany(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(updateUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findUserByPk(id);
  }

  @Get('temp/:form_type')
  getTemplate(@Param('form_type') form_type: string) {
    return this.usersService.getTemplate(form_type);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/delete')
  deleteCompany(@Body() removeUserDto: { id: number }) {
    return this.usersService.deleteUser(removeUserDto);
  }
}
