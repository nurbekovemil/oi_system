import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createReport(@Request() req, @Body() createReportDto: CreateReportDto) {
    const { companyId, userId } = req.user;
    return this.reportsService.createReport({
      ...createReportDto,
      companyId,
      userId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  updateReport(@Body() updateReportDto: UpdateReportDto) {
    return this.reportsService.updateReport(updateReportDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/by/:id')
  getReportById(@Param('id') id: number) {
    return this.reportsService.getReportById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  getReports() {
    return this.reportsService.getReports();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/types')
  getReportTypes() {
    return this.reportsService.getReportTypes();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/old')
  getOldReports(@Request() req) {
    const { userId } = req.user;
    return this.reportsService.getOldReports(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/template/:tid')
  getReportTemplates(@Param('tid') tid: number) {
    return this.reportsService.getReportTemplate(tid);
  }
}
