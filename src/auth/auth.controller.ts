import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

    // User to SignUp
  @Post('/signup')
  async signUp(@Body() dto: AuthDto) {
    return await this.authService.signUp(dto);
  }
    
    
    // User to SignIN
  @Post('/signin')
  async signIn(@Body() dto: AuthDto) {
    return await this.authService.signIn(dto);
  }
    
    // User to SignOut
    
}
