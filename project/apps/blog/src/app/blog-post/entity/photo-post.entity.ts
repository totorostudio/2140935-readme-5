import { PhotoPost } from '@project/libs/shared/app/types';
import { PostType } from '.prisma/client';
import { Entity } from '@project/shared/core';
import { BlogTagEntity } from '../../blog-tag/blog-tag.entity';
import { CreatePhotoPostDto } from '../dto/create-photo-post.dto';
import { BasePostEntity } from './base-post.entity';

export class PhotoPostEntity extends BasePostEntity implements PhotoPost, Entity<string, PhotoPost> {
  public photoUrl: string;

  constructor (post: PhotoPost) {
    super(post);
  }

  public populate(data: PhotoPost): PhotoPostEntity {
    super.populate(data);
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
    return new PhotoPostEntity(data)
      .populate(data);
  }

  static fromDto(dto: CreatePhotoPostDto, tags: BlogTagEntity[]): PhotoPostEntity {
    const photoPost: PhotoPost = {
      ...dto,
      type: PostType.photo,
      comments: [],
      tags: tags.map(tag => tag.toPOJO()),
      isRepost: dto.isRepost ?? undefined,
      isDraft: dto.isDraft ?? undefined,
    };

    const entity = new PhotoPostEntity(photoPost);

    return entity;
  }
}
