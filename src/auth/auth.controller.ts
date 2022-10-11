import {
  Controller,
  Body,
  Post,
  UseGuards,
  Get,
  Request,
  Res,
  UnauthorizedException,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { CreateDto } from './dto/createDto';
import { response, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // User to SignUp
  @Post('/signup')
  async signUp(@Body() dto: CreateDto) {
    return await this.authService.signUp(dto);
  }

  // User to SignIN
  @Post('/signin')
  async signIn(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.signIn(dto, response);
  }

  // User to SignOut
  @Post('/signout')
  async signOut(@Res({ passthrough: true }) response: Response) {
    return await this.authService.signOut(response);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './src/uploadedFiles',
        filename: (req, file, callBack) => {
          // storing the file original name
          const fileName =
            path.parse(file.originalname).name.replace(/\s/g, '') + Date.now();
          //storing in file in a extention
          const extention = path.parse(file.originalname).ext;
          callBack(null, `${fileName}${extention}`);
        },
      }),
    }),
  )
  // sending a response
  fileUpload(
    @Res() res,
    @UploadedFile(
      // adding validation to the file
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: 'png' }),
        ],
      }),
    )
    file,
  ) {
    // returning
    return res.status(HttpStatus.OK).json({
      sucess: true,
      data: file.path,
    });
  }

  //TO PROTECT or access THE ROUTE, we need to have that jwt token, so we use a guard to get it
  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  async getVerifyUsers(@Request() request) {
    // return await this.authService.verifyUser(request)
    return await request.user;
  }

  @Put(':id')
  async updateUser(@Param('id') id, @Body() user) {
    return await this.authService.updateUser(id, user)
  }

}
