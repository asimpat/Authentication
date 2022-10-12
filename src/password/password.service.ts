import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { Password } from './passwordEntity/passEntity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  constructor(
    @InjectRepository(Password)
    private readonly passwordRepository: Repository<Password>,
    private mailerservice: MailerService,
    private authService: AuthService,
  ) {}

  async getUserByToken(token) {
    return await this.passwordRepository.findOneBy({ token });
  }

  async forgetPassword(email) {
    const user = await this.authService.getUserByEmail(email);
    // generate a random token
    const token = Math.random().toString(30).substring(2, 30);

    if (!user) {
      return `user not found`;
    }
   
    await this.passwordRepository.save({
      email,
      token,
    });

    //   send an email
    // const url = `http://localhost:3000/reset/${token}`; // the port is dependent on the frontend
    // await this.mailerservice.sendMail({
    //   // from: 'admin@example.com',
    //   to: email,
    //   subject: `Reset Password`,
    //   html: `Click <a href="${url}">Here</a> to reset your password`,
    // });

    return {
      token,
      message: 'Please check your email to reset password',
    };
  }

  // Reset the password
  async resetPassword( password) {
    const isToken = await this.getUserByToken(password.token);

    if (!isToken) {
      return {
        message: `Confirm token`,
      };
    }
    if (password.password !== password.confirmPassword) {
      return {
        message:`password does not match`
      }
    }
    const user = await this.authService.getUserByEmail(isToken.email)
    if (!user) { return `user not found` }
const hash=await bcrypt.hash(user.password, 12)
    await this.authService.update(user.id, {password:hash})
    return {
      message:`password reset successfully`
    }
  }
   
}


