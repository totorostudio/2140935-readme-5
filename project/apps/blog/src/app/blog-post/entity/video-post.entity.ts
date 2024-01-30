import { VideoPost } from '@project/libs/shared/app/types';
import { Entity } from '@project/shared/core';
import { BlogTagEntity } from '../../blog-tag/blog-tag.entity';
import { CreateVideoPostDto } from '../dto/create-video-post.dto';
import { BasePostEntity } from './base-post.entity';

export class VideoPostEntity extends BasePostEntity implements VideoPost, Entity<string, VideoPost> {
  public videoUrl: string;

  constructor (post: VideoPost) {
    super(post);
    this.populate(post);
  }

  public populate(data: VideoPost): VideoPostEntity {
    this.videoUrl = data.videoUrl;

    return this;
  }

  public toPOJO(): VideoPost {
    return {
      ...super.toPOJO(),
      videoUrl: this.videoUrl
    }
  }

  static fromObject(data: VideoPost): VideoPostEntity {
    return new VideoPostEntity(data)
      .populate(data);
  }

  static fromDto(dto: CreateVideoPostDto, tags: BlogTagEntity[]): VideoPostEntity {
    const entity = new VideoPostEntity();
    entity.title = dto.title;
    entity.userId = dto.userId;
    entity.tags = tags;
    entity.comments = [];
    entity.isRepost = dto.isRepost;
    entity.isDraft = dto.isDraft;
    entity.videoUrl = dto.videoUrl;

    return entity;
  }
}
