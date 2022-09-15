import { IsNotEmpty, IsString, Length } from "class-validator"


export class AuthDto {


    @IsNotEmpty()
    @IsString()
    email: string

    @Length(8, 12)
    @IsNotEmpty()
    password: string
  
}