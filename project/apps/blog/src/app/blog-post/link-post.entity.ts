import { LinkPost, PostType } from '@project/libs/shared/app/types';
import { Entity } from '@project/shared/core';
import { BlogTagEntity } from '../blog-tag/blog-tag.entity';
import { BlogCommentEntity } from '../blog-comment/blog-comment.entity';
import { CreatePostDto } from './dto/create-post.dto';

export class LinkPostEntity implements LinkPost, Entity<string, LinkPost> {
  public id?: string;
  public originalId?: string;
  public isRepost?: boolean;
  public isDraft?: boolean;
  public type: PostType;
  public title: string;
  public likesCount?: number;
  public commentsCount?: number;
  public tags: BlogTagEntity[];
  public comments: BlogCommentEntity[];
  public createdAt?: Date;
  public updatedAt?: Date;
  public originalAuthor?: string;
  public userId: string;
  public description: string;
  public linkUrl: string;

  public populate(data: LinkPost): LinkPostEntity {
    this.id = data.id ?? undefined;
    this.originalId = data.originalId ?? undefined;
    this.isRepost = data.isRepost;
    this.isDraft = data.isDraft;
    this.type = data.type;
    this.title = data.title;
    this.likesCount = data.likesCount;
    this.commentsCount = data.commentsCount;
    this.tags = data.tags.map((tag) => BlogTagEntity.fromObject(tag));
    this.comments = [];
    this.createdAt = data.createdAt ?? undefined;
    this.updatedAt = data.updatedAt ?? undefined;
    this.originalAuthor = data.originalAuthor;
    this.userId = data.userId;
    this.description = data.description;
    this.linkUrl = data.linkUrl;

    return this;
  }

  public toPOJO(): LinkPost {
    return {
      id: this.id,
      originalId: this.originalId,
      isRepost: this.isRepost,
      isDraft: this.isDraft,
      type: this.type,
      title: this.title,
      likesCount: this.likesCount,
      commentsCount: this.commentsCount,
      tags: this.tags.map((tagEntity) => tagEntity.toPOJO()),
      comments: [],
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      originalAuthor: this.originalAuthor,
      userId: this.userId,
      description: this.description,
      linkUrl: this.linkUrl
    }
  }

  static fromObject(data: LinkPost): LinkPostEntity {
    return new LinkPostEntity()
      .populate(data);
  }

  static fromDto(dto: CreatePostDto, tags: BlogTagEntity[]): LinkPostEntity {
    const entity = new LinkPostEntity();
    entity.tags = tags;
    entity.title = dto.title;
    entity.description = dto.description;
    entity.content = dto.content;
    entity.userId = dto.userId;
    entity.comments = [];

    return entity;
  }
}
