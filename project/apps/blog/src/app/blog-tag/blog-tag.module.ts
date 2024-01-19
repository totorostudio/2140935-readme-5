import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/shared/blog/models';
import { BlogTagRepository } from './blog-tag.repository';
import { BlogTagController } from './blog-tag.controller';
import { BlogTagService } from './blog-tag.service';

@Module({
  imports: [PrismaClientModule],
  providers: [BlogTagRepository, BlogTagService],
  controllers: [BlogTagController],
  exports: [BlogTagService],
})
export class BlogTagModule {}
