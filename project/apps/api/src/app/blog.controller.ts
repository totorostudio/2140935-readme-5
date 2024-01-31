import { Body, Controller, Get, Post, Patch, Delete, Req, Param, UseFilters, UploadedFile, UseGuards, UseInterceptors, Query, HttpStatus } from '@nestjs/common';
import 'multer';
import FormData from 'form-data';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { UseridInterceptor } from './interceptors/userid.interceptor';
import { BlogPostQuery } from '@project/shared/app/dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlogInfo } from './app.constant';
import { CreatePhotoPostDto, CreateBlogPostDtoType, UpdateBlogPostDtoType, SearchQuery } from '@project/shared/app/dto';

@ApiTags('posts')
@Controller('posts')
@UseFilters(AxiosExceptionFilter)
export class BlogController {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogInfo.ShowAll
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogInfo.EmptyList
  })
  @Get('/')
  public async showPosts(@Query() query: BlogPostQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/`, {
      params: query
    });

    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogInfo.ShowSingle
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogInfo.PostNotFound
  })
  @Get('/:id')
  public async showPostById(@Param('id') id: string) {
    const { data: postData } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/${id}`);

    return postData;
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: BlogInfo.Add,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @Post('/')
  public async create(@Req() req: Request, @Body() dto: CreateBlogPostDtoType, @UploadedFile() file: Express.Multer.File) {
    if (file && dto instanceof CreatePhotoPostDto) {
      const formData = new FormData();
      formData.append('file', Buffer.from(file.buffer), file.originalname);

      const { data: photo } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Files}/upload/photo`, formData, {
        headers: {
          'Content-Type': req.headers['content-type'],
          ...formData.getHeaders(),
        },
      });

      dto.photoUrl = photo.path;
    }

    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/add`, dto);

    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogInfo.Update,
  })
  @Patch('/:id')
  public async update(@Req() req: Request, @Param('id') id: string, @Body() dto: UpdateBlogPostDtoType) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Blog}/${id}`, dto,{
      headers: {
        'Authorization': req.headers['authorization']
      },
    });

    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogInfo.Remove,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogInfo.DeleteError
  })
  @Delete('/:id')
  public async delete(@Param('id') id: string, @Req() req: Request) {
    await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Blog}/${id}`, {
      headers: {
        'Authorization': req.headers['authorization']
      },
    });
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: BlogInfo.Add,
  })
  @Post('repost/:id')
  public async repost(@Req() req: Request, @Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/repost/${id}`, null, {
      headers: {
        'Authorization': req.headers['authorization'],
      },
    });

    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: BlogInfo.ShowAll
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogInfo.EmptyList
  })
  @Get('search')
  public async searchPostsByTitle(@Query() query: SearchQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/search`, {
      params: query
    });

    return data;
  }
}
