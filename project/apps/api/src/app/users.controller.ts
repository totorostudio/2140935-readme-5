import { Body, Controller, Post, Get, Req, Param, UseFilters, UploadedFile, UseInterceptors, HttpStatus } from '@nestjs/common';
import 'multer';
import FormData from 'form-data';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { Request } from 'express';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { LoginUserDto } from '@project/shared/app/dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MongoIdValidationPipe } from '@project/shared/core';
import { CreateUserDto } from '@project/shared/app/dto';
import { UserInfo } from './app.constant';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('users')
@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: UserInfo.Register,
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post('registration')
  public async register(@Req() req: Request, @Body() createUserDto: CreateUserDto, @UploadedFile() file: Express.Multer.File) {
    let path: string;

    if (file) {
      const formData: FormData = new FormData();
      formData.append('file', Buffer.from(file.buffer), file.originalname);
      const { data: avatar } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Files}/upload`, formData, {
        headers: {
          'Content-Type': req.headers['content-type'],
          ...formData.getHeaders()
        }
      });

      path = avatar.path;
    }

    const { data: user } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/register`, { ...createUserDto, avatar: path });

    return user;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: UserInfo.Login,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: UserInfo.InvalidData,
  })
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/login`, loginUserDto);
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: UserInfo.Refresh,
  })
  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/refresh`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: UserInfo.UserFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: UserInfo.NotFound,
  })
  @Get('/:id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const { data: userData } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${id}`);
    const { data: postsCount } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/user-posts-count/${id}`);
    let avatar = null;

    if (userData.avatar) {
      avatar = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Files}/upload/${userData.avatar}`);
    }

    return { ...userData, postsCount, avatar };
  }
}
