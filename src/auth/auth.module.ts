import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Auth } from './authEntity/auth.entity';
import { jwtStrategy } from './strategy/jwt-strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    JwtModule.register({
      secret: 'OURSECRET',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, jwtStrategy],
})
export class AuthModule {}
