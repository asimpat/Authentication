import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
    token: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString() 
    confirmPassword: string;
}
