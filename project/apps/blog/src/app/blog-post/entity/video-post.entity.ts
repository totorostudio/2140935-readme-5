import { VideoPost } from '@project/libs/shared/app/types';
import { PostType } from '.prisma/client';
import { Entity } from '@project/shared/core';
import { BlogTagEntity } from '../../blog-tag/blog-tag.entity';
import { CreateVideoPostDto } from '../dto/create-video-post.dto';
import { BasePostEntity } from './base-post.entity';

export class VideoPostEntity extends BasePostEntity implements VideoPost, Entity<string, VideoPost> {
  public videoUrl: string;

  constructor (post: VideoPost) {
    super(post);
  }

  public populate(data: VideoPost): VideoPostEntity {
    super.populate(data);
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
    const videoPost: VideoPost = {
      ...dto,
      type: PostType.video,
      comments: [],
      tags: tags.map(tag => tag.toPOJO()),
      isRepost: dto.isRepost ?? undefined,
      isDraft: dto.isDraft ?? undefined,
    };

    const entity = new VideoPostEntity(videoPost);

    return entity;
  }
}
