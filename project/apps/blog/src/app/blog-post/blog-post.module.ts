import { Module } from "@nestjs/common";
import { HttpModule } from '@nestjs/axios';
import { BlogTagModule } from '../blog-tag/blog-tag.module';
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostController } from './blog-post.controller';
import { BlogPostService } from './blog-post.service';
import { PrismaClientModule } from '@project/shared/blog/models';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { HttpClientParam } from './post.constant';

@Module({
  imports: [
    BlogTagModule,
    PrismaClientModule,
    HttpModule.register({
      timeout: HttpClientParam.Timeout,
      maxRedirects: HttpClientParam.MaxRedirect,
    }),
  ],
  controllers: [BlogPostController],
  providers: [BlogPostService, BlogPostRepository, CheckAuthGuard],
  exports: [BlogPostService],
})
export class BlogPostModule {}
