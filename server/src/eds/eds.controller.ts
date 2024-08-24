import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { EdsService } from './eds.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('eds')
export class EdsController {
  constructor(private readonly edsService: EdsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/pin/send')
  sendPinCodeEmail(@Request() req) {
    return this.edsService.sendPinCodeEmail(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/pin/confirm')
  confirmPinCode(
    @Body() body: { pin: number; reportId: number },
    @Request() req,
  ) {
    return this.edsService.confirmPinCode(req.user, body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/rutoken/sign')
  signRutoken(@Body() body, @Request() req) {
    return this.edsService.signRutoken(req.user, body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('contract/rutoken/sign')
  signContractRutoken(@Body() body, @Request() req) {
    return this.edsService.signContractRutoken(req.user, body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('contract/pin/confirm')
  confirmContractPinCode(
    @Body() body: { pin: number; contractId: number },
    @Request() req,
  ) {
    // return this.edsService.confirmPinCode(req.user, body);
  }
}
