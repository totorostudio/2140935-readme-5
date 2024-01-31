import { Injectable, NotFoundException } from '@nestjs/common';

import { BlogPostRepository } from './blog-post.repository';
import { CreateBlogPostDtoType } from './dto/create-blog-post.dto';
import { BlogPostQuery } from '@project/shared/blog/dto';
import { PaginationResult } from '@project/libs/shared/app/types';
import { UpdateBlogPostDtoType } from './dto/update-blog-post.dto';
import { BlogTagService } from '../blog-tag/blog-tag.service';
import { PostEntityFactory, BlogPostEntityType } from './post-entity.factory';

@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
    private readonly blogTagService: BlogTagService,
  ) {}

  public async getAllPosts(query?: BlogPostQuery): Promise<PaginationResult<BlogPostEntityType>> {
    return this.blogPostRepository.find(query);
  }

  public async createPost(dto: CreateBlogPostDtoType): Promise<BlogPostEntityType> {
    const tags = await this.blogTagService.getTagsByIds(dto.tags);
    const newPost = PostEntityFactory({...dto, tags, comments: []});
    await this.blogPostRepository.save(newPost);

    return newPost;
  }

  public async deletePost(id: string): Promise<void> {
    try {
      await this.blogPostRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }

  public async getPost(id: string): Promise<BlogPostEntityType> {
    return this.blogPostRepository.findById(id);
  }

  public async updatePost(id: string, dto: UpdateBlogPostDtoType): Promise<BlogPostEntityType> {
    const existsPost = await this.blogPostRepository.findById(id);
    let isSameTags = true;
    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && key !== 'tags' && existsPost[key] !== value) {
        existsPost[key] = value;
        hasChanges = true;
      }

      if (key === 'tags' && value) {
        const currentTagIds = existsPost.tags.map((tag) => tag.id);
        isSameTags = currentTagIds.length === value.length &&
          currentTagIds.some((tagId) => value.includes(tagId));

        if (! isSameTags) {
          existsPost.tags = await this.blogTagService.getTagsByIds(dto.tags);
        }
      }
    }

    if (isSameTags && ! hasChanges) {
      return existsPost;
    }

    return this.blogPostRepository.update(id, existsPost);
  }
}
