import { LinkPost } from '@project/libs/shared/app/types';
import { PostType } from '.prisma/client';
import { Entity } from '@project/shared/core';
import { BlogTagEntity } from '../../blog-tag/blog-tag.entity';
import { CreateLinkPostDto } from '../dto/create-link-post.dto';
import { BasePostEntity } from './base-post.entity';

export class LinkPostEntity extends BasePostEntity implements LinkPost, Entity<string, LinkPost> {
  public description: string;
  public linkUrl: string;

  constructor (post: LinkPost) {
    super(post);
  }

  public populate(data: LinkPost): LinkPostEntity {
    super.populate(data);
    this.description = data.description;
    this.linkUrl = data.linkUrl;

    return this;
  }

  public toPOJO(): LinkPost {
    return {
      ...super.toPOJO(),
      description: this.description,
      linkUrl: this.linkUrl
    }
  }

  static fromObject(data: LinkPost): LinkPostEntity {
    return new LinkPostEntity(data)
      .populate(data);
  }

  static fromDto(dto: CreateLinkPostDto, tags: BlogTagEntity[]): LinkPostEntity {
    const linkPost: LinkPost = {
      ...dto,
      type: PostType.link,
      comments: [],
      tags: tags.map(tag => tag.toPOJO()),
      isRepost: dto.isRepost ?? undefined,
      isDraft: dto.isDraft ?? undefined,
    };

    const entity = new LinkPostEntity(linkPost);

    return entity;
  }
}
