import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
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
  Query,
} from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Put()
  updateUser(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(updateUserDto);
  }

  @Put('/change-pass')
  updateUserPassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.usersService.updateUserPassword(changePasswordDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findUserByPk(id);
  }

  @Get('temp/:form_type')
  getTemplate(@Param('form_type') form_type: string) {
    return this.usersService.getTemplate(form_type);
  }

  @Post('/delete')
  deleteUser(@Body() removeUserDto: { id: number }) {
    return this.usersService.deleteUser(removeUserDto);
  }

  @Get('/reset/pass')
  resetUserPass(@Query() query) {
    return this.usersService.resetUserPass(query);
  }
}
