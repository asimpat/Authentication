import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';
import { Password } from './passwordEntity/passEntity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Password]),
    MailerModule.forRoot({
      transport: {
        host: '0.0.0.0',
        port: 8025,
      },
      defaults: {
        from: 'admin@example.com',
      },
    }),
    JwtModule.register({
      secret: 'true',
      signOptions: { expiresIn: '1d' },
    }),  ],
  controllers: [PasswordController],
  providers: [PasswordService],
  
})
export class PasswordModule {}
