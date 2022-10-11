import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';
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
    // PassportModule.register({ defaultStrategy: 'bearer' }),
    MulterModule.register({
      dest: './upload',
    }),
 
  ],
  controllers: [AuthController],
  providers: [jwtStrategy, AuthService],
  exports:[AuthService]
})
export class AuthModule {}
