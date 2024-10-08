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
  UseInterceptors,
  UploadedFile,
  Res,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createReport(@Request() req, @Body() createReportDto: CreateReportDto) {
    const { companyId, userId, roles } = req.user;
    return this.reportsService.createReport({
      ...createReportDto,
      companyId,
      userId,
    }, roles);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  @UseInterceptors(FileInterceptor('file'))
  updateReport(@Body() updateReportDto: UpdateReportDto, @UploadedFile() file) {
    return this.reportsService.updateReport(updateReportDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/file/remove')
  removeReportFile(@Body() name: { name: string }) {
    console.log(name);
    return this.reportsService.removeReportFile(name);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/reject')
  rejectReport(@Body() data) {
    return this.reportsService.updateReportStatus(data.id, 3);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/send')
  sendReport(@Body() body) {
    return this.reportsService.sendReport(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/company')
  updateReportCompanyId(@Body() body) {
    return this.reportsService.updateReportCompanyId(body);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/by/:id')
  getReportById(@Param('id') id: number) {
    return this.reportsService.getReportById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN', 'USER', 'MODERATOR')
  @UseGuards(RolesGuard)
  @Get('/sort/:page/:limit')
  getReports(@Param() param: any, @Request() req) {
    return this.reportsService.getReports(req.user, param);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/types')
  getReportTypes() {
    return this.reportsService.getReportTypes();
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/types/:id')
  getReportTypeById(@Param('id') id: number) {
    return this.reportsService.getReportTypeById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/old')
  getOldReports(@Request() req) {
    return this.reportsService.getOldReports(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/template/:tid')
  getReportTemplates(@Param('tid') tid: number) {
    return this.reportsService.getReportTemplate(tid);
  }

  @Get('static/:filename')
  getStaticFile(@Param('filename') filename: string, @Res() res: Response) {
    res.sendFile(filename, { root: './dist/static' });
  }

  @Get('static/user_guides/:filename')
  getStaticUserGuideFile(
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    res.sendFile(filename, { root: './dist/static/user_guides' });
  }
  @UseGuards(JwtAuthGuard)
  @Get('group')
  getReportsByGroupType(@Query() query, @Request() req) {
    return this.reportsService.getReportsByGroupType(query, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/remove')
  removeReport(@Body() body) {
    return this.reportsService.removeReport(body);
  }

}
