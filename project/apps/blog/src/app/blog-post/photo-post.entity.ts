import { PhotoPost } from '@project/libs/shared/app/types';
import { Entity } from '@project/shared/core';
import { BlogTagEntity } from '../blog-tag/blog-tag.entity';
import { BlogCommentEntity } from '../blog-comment/blog-comment.entity';
import { CreatePhotoPostDto } from './dto/create-photo-post.dto';
import { BasePostEntity } from './base-post.entity';

export class PhotoPostEntity extends BasePostEntity implements PhotoPost, Entity<string, PhotoPost> {
  public photoUrl: string;

  public populate(data: PhotoPost): PhotoPostEntity {
    this.photoUrl = data.photoUrl;

    return this;
  }

  public toPOJO(): PhotoPost {
    return {
      ...super.toPOJO(),
      photoUrl: this.photoUrl
    }
  }

  static fromObject(data: PhotoPost): PhotoPostEntity {
    return new PhotoPostEntity()
      .populate(data);
  }

  static fromDto(dto: CreatePhotoPostDto, tags: BlogTagEntity[]): PhotoPostEntity {
    const entity = new PhotoPostEntity();
    entity.title = dto.title;
    entity.userId = dto.userId;
    entity.tags = tags;
    entity.comments = [];
    entity.isRepost = dto.isRepost;
    entity.isDraft = dto.isDraft;
    entity.photoUrl = dto.photoUrl;

    return entity;
  }
}
