import { AuthService } from './auth.service';
import { Body, Controller, Post, Get, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('/login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.AuthService.login(dto);

    res.cookie('refreshToken', data.tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return data;
  }
  @Get('/logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { refreshToken } = req.cookies;
    const data = await this.AuthService.logout(refreshToken);

    res.clearCookie('refreshToken');
    return data;
  }

  @Get('/refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken } = req.cookies;
    const data = await this.AuthService.refresh(refreshToken);
    res.cookie('refreshToken', data.tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return data;
  }
}
