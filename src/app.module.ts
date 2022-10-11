import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/authEntity/auth.entity';
// import { jwtStrategy } from './auth/strategy/jwt-strategy';
import { PasswordModule } from './password/password.module';
import { Password } from './password/passwordEntity/passEntity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'authentication',
      entities: [Auth, Password],
      synchronize: true,
    }),
    AuthModule,
    PasswordModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
