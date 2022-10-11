import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @Length(5, 12)
  @IsNotEmpty()
  password: string;

  @Length(5, 12)
  @IsNotEmpty()
  ConfirmPassword: string;
}
