import {
  Controller,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  Res,
  Req,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/signin-user.dto';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async signin(@Body() signInUserDto: SignInUserDto, @Res() res: Response) {
    await this.authService.signin(signInUserDto, res);
    res.sendStatus(200);
  }

  @Post('signout')
  async signout(@Res() res: Response) {
    await this.authService.signout(res);
    res.sendStatus(200);
  }

  @Get('currentuser')
  async currentUser(@Req() req: Request) {
    return this.authService.currentUser(req);
  }
}
