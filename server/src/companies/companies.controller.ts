import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  Put,
  Query,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RemoveCompanyDto } from './dto/remove-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }
  @UseGuards(JwtAuthGuard)
  @Put()
  updateCompany(@Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.updateCompany(updateCompanyDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  getCompanies(@Query() query) {
    return this.companiesService.getCompanies(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/option')
  getCompaniesForOption() {
    return this.companiesService.getCompaniesForOption();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.companiesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/delete')
  deleteCompany(@Request() req, @Body() removeCompanyDto: RemoveCompanyDto) {
    const { userId } = req.user;
    return this.companiesService.deleteCompany({ ...removeCompanyDto, userId });
  }

  @Get('temp/:form_type')
  getTemplate(@Param('form_type') form_type: string) {
    return this.companiesService.getTemplate(form_type);
  }

  // @Get('/mock/test-data')
  // createMockData() {
  //   return this.companiesService.createMockData();
  // }
}
