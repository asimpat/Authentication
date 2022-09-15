import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { GetCurrentUserById } from './auth/utils/getUserByIdDeco';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //TO PROTECT or access THE ROUTE, we need to have that jwt token, so we use a guard to get it
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getUserAuthorized(@GetCurrentUserById() userid: number) {
    return this.appService.getUserAuthorized(userid);
  }
}
