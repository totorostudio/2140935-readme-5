import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogTagModule } from './blog-tag/blog-tag.module';
import { BlogPostModule } from './blog-post/blog-post.module';

@Module({
  imports: [BlogTagModule, BlogPostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
