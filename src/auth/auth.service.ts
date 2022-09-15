import { Injectable } from '@nestjs/common';
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

  // create a user to the database
  async signUp(dto: AuthDto) {}

  async signIn(dto: AuthDto) {
    //retrieve the user
  }

  // creating the JWT token
  signUser(userId: number, email: string, type: string) {}
}
