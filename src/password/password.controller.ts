import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ForgetPasswordDto } from 'src/auth/dto/forgetPassword.dto';
import { ResetPasswordDto } from 'src/auth/dto/reset.dto';
import { PasswordService } from './password.service';

@Controller('password')
export class PasswordController {
  constructor(private passwordService: PasswordService) {}

  @Post('forgot')
  async forgetPassword(@Body() user: ForgetPasswordDto) {
    return await this.passwordService.forgetPassword(user.email);
  }
    
    @Post('reset')
    async resetPassword( @Body() password: ResetPasswordDto) { 
        return await this.passwordService.resetPassword( password)
    }
}
