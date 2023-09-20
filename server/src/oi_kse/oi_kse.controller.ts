import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OiKseService } from './oi_kse.service';
import { CreateOiKseDto } from './dto/create-oi_kse.dto';
import { UpdateOiKseDto } from './dto/update-oi_kse.dto';

@Controller('oi-kse')
export class OiKseController {
  constructor(private readonly oiKseService: OiKseService) {}
  @Get('')
  getReportsByCompanyId(@Query() query) {
    return this.oiKseService.getReportsByCompanyId(query);
  }
}
