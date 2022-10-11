import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ForgetPasswordDto {
  @IsNotEmpty()
  @IsString()
  email: string;

}
