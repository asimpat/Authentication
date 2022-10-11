import {
  BadRequestException,
  Injectable,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './authEntity/auth.entity';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { CreateDto } from './dto/createDto';
import { Request, Response } from 'express';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }
  async getUserByEmail(email: string) {
    return await this.authRepository.findOneBy({ email });
  }
  async getUserById(id) {
    return await this.authRepository.findOne({
      where: { id: id },
    });
  }

  async getUser(getUser): Promise<Auth[]> {
    return await this.authRepository.find(getUser);
  }
  // async fineOneUser(condition: any): Promise<Auth> {
  //   return this.authRepository.findOne(condition);
  // }

  // create/SignUp a user
  async signUp(dto: CreateDto) {
    const sameEmail = await (
      await this.getUser(dto)
    ).find((user) => user.email === dto.email);
    if (sameEmail) {
      throw new UnauthorizedException('Email already exist');
    }

    if (dto.password !== dto.ConfirmPassword) {
      throw new BadRequestException(['password are not identical']);
    } else {
      const { password } = dto;

      await this.authRepository.save({
        ...dto,
        password: await this.hashPassword(password),
      });
      return { message: 'user successfully Registered' };
    }
  }

  // creating the JWT token

  signUser(userId: number, email: string, type: string) {
    return this.jwtService.signAsync({
      sub: userId,
      email,
      password: type,
    });
  }

  // SignIn User
  async signIn(
    dto: AuthDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Auth | Object> {
    //retrieve the user
    const user = await this.getUserByEmail(dto.email);

    // const user = await this.authRepository.findOne(dto.email);
    // Check for PASSWORD

    if (!user) {
      throw new UnauthorizedException('Credential incorrect');
    }

    if (!(await bcrypt.compare(dto.password, user.password))) {
      throw new BadRequestException('invalid ');
    }

    const jwt = await this.signUser(user.id, user.email, user.password);

    response.cookie('jwt', jwt, { httpOnly: true }); //the frontend can not access the jwt

    return {
      message: 'success',
    };
  }

  // SignOut User
  async signOut(
    @Res({ passthrough: true }) response: Response,
  ): Promise<Auth | Object> {
    response.clearCookie('jwt');
    return {
      message: `sucessfully logged out`,
    };
  }

  // User Update Profile
  async updateUser(id, user: Auth) {
    const getUser = await this.getUserById(user.id);
    if (!getUser) {
      throw new UnauthorizedException(`User not found`);
    }
    const newUser = await this.authRepository.create(user);
    newUser.password = await this.hashPassword(user.password);
    await this.authRepository.update(id, {password:newUser.password});
    return {
      message: `User sucessfully Updated`,
    };
  }
  async reset(user: Auth) {
    const newUser = await this.authRepository.create(user);
    newUser.password = await this.hashPassword(user.password);
    await this.authRepository.update(newUser.id, newUser);
    return {
      message: `password reset successfully`,
    };
  }
  async update(id: number, user: any) {
    return await this.authRepository.update(id, user);
  }
}
