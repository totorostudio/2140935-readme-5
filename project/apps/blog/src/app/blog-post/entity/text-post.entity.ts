import { TextPost } from '@project/libs/shared/app/types';
import { PostType } from '.prisma/client';
import { Entity } from '@project/shared/core';
import { BlogTagEntity } from '../../blog-tag/blog-tag.entity';
import { CreateTextPostDto } from '../dto/create-text-post.dto';
import { BasePostEntity } from './base-post.entity';

export class TextPostEntity extends BasePostEntity implements TextPost, Entity<string, TextPost> {
  public description: string;
  public content: string;

  constructor (post: TextPost) {
    super(post);
  }

  public populate(data: TextPost): TextPostEntity {
    super.populate(data);
    this.description = data.description;
    this.content = data.content;

    return this;
  }

  public toPOJO(): TextPost {
    return {
      ...super.toPOJO(),
      description: this.description,
      content: this.content
    }
  }

  static fromObject(data: TextPost): TextPostEntity {
    return new TextPostEntity(data)
      .populate(data);
  }

  static fromDto(dto: CreateTextPostDto, tags: BlogTagEntity[]): TextPostEntity {
    const textPost: TextPost = {
      ...dto,
      type: PostType.text,
      comments: [],
      tags: tags.map(tag => tag.toPOJO()),
      isRepost: dto.isRepost ?? undefined,
      isDraft: dto.isDraft ?? undefined,
    };

    const entity = new TextPostEntity(textPost);

    return entity;
  }
}
