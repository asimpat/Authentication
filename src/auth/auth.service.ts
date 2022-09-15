import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './authEntity/auth.entity';
import { AuthDto } from './dto/auth.dto';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private jwtService: JwtService,
  ) {}

  async getUser(getUser): Promise<Auth[]> {
    return await this.authRepository.find(getUser);
  }

  // create/SignUp a user
  async signUp(dto: AuthDto) {
    const sameEmail = await (
      await this.getUser(dto)
    ).find((user) => user.email === dto.email);
    if (sameEmail) {
      throw new UnauthorizedException('Email already exist');
    } else {
        await this.authRepository.save(dto);
        return {message:"user successfully Registered"}
    }
  }

  // SignIn User
  async signIn(dto: AuthDto) {
    //retrieve the user
    const user = await (
      await this.getUser(dto)
    ).find((user) => user.email === dto.email);
    if (!user) {
      throw new UnauthorizedException('Credential incorrect');
    } else {
      return this.signUser(user.id, user.email, user.password);
    }
  }
    
  // creating the JWT token
  signUser(userId: number, email: string, type: string) {
    return this.jwtService.sign({
      sub: userId,
      email,
      password: type,
    });
  }

  // SignOut User
}