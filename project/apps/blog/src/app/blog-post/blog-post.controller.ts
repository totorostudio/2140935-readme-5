import { Body, Controller, Delete, Get, Patch, Post, HttpCode, HttpStatus, Param, Req, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateBlogPostDtoType, UpdateBlogPostDtoType, SearchQuery } from '@project/shared/app/dto';
import { RequestWithTokenPayload } from '@project/libs/shared/app/types';
import { fillDto } from '@project/shared/helpers';
import { BlogPostRdo } from './rdo/blog-post.rdo';
import { BlogPostService } from './blog-post.service';
import { BlogPostQuery } from '@project/shared/app/dto';
import { BlogPostWithPaginationRdo } from './rdo/blog-post-with-pagination.rdo';
import { PostInfo, PostsError } from './post.constant';
import { CheckAuthGuard } from './guards/check-auth.guard';

@ApiTags('posts')
@Controller('posts')
export class BlogPostController {
  constructor (
    private readonly blogPostService: BlogPostService,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.ShowAll,
  })
  @Get('/')
  public async index(@Query() query: BlogPostQuery) {
    const postsWithPagination = await this.blogPostService.getAllPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO()),
    }
    return fillDto(BlogPostWithPaginationRdo, result);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Show,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Show,
  })
  @Get('/:id')
  public async show(@Param('id') id: string) {
    const post = await this.blogPostService.getPost(id);
    return fillDto(BlogPostRdo, post.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: PostInfo.Add,
  })
  @Post('/')
  public async create(@Body() dto: CreateBlogPostDtoType) {
    const newPost = await this.blogPostService.createPost(dto);
    return fillDto(BlogPostRdo, newPost.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Update,
  })
  @UseGuards(CheckAuthGuard)
  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateBlogPostDtoType) {
    const updatedPost = await this.blogPostService.updatePost(id, dto);
    return fillDto(BlogPostRdo, updatedPost.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: PostInfo.Remove,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: PostsError.Delete
  })
  @UseGuards(CheckAuthGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('id') id: string) {
    await this.blogPostService.deletePost(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Repost,
  })
  @UseGuards(CheckAuthGuard)
  @Post('/repost/:id')
  public async repost(
    @Req() { user }: RequestWithTokenPayload,
    @Param('id') id: string,
  ) {
    const post = await this.blogPostService.repost(id, user.sub);

    return fillDto(BlogPostRdo[post.type], post.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Search,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostInfo.Search,
  })
  @Get('search')
  async search(@Query() query: SearchQuery) {
    const posts = await this.blogPostService.getPostsBySearch(query);

    return posts.map((post) => fillDto(BlogPostRdo[post.type], post.toPOJO));
  }
}
