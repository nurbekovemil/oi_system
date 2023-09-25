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
import { ReceiptsService } from './receipts.service';

@Controller('receipt')
export class ReceiptsController {
  constructor(private receiptsService: ReceiptsService) {}
  @Get('/:id')
  getReceiptById(@Param('id') id: number) {
    return this.receiptsService.getReceiptById(id);
  }
}
