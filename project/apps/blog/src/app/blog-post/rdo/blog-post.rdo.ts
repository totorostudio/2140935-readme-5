import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { TagRdo } from '../../blog-tag/rdo/tag.rdo';
import { PostType } from '.prisma/client';

export class BlogPostRdo {
  @ApiProperty({
    description: 'Unique post ID'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Unique post ID if reposted'
  })
  @Expose()
  public originalId?: string;

  @ApiProperty({
    description: 'Post type one of [text, video, quote, photo, link]',
    example: 'text',
  })
  @Expose()
  public type: PostType;

  @ApiProperty({
    description: 'Title of this post',
    example: 'Some title of this post',
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Description of this post',
    example: 'Some description about this post',
  })
  @Expose()
  public description?: string;

  @ApiProperty({
    description: 'Is post a repost?',
    example: false,
  })
  @Expose()
  public isRepost?: boolean;

  @ApiProperty({
    description: 'Is post in draft status?',
    example: false,
  })
  @Expose()
  public isDraft?: boolean;

  @ApiProperty({
    description: 'Total amount of likes',
    example: 0,
  })
  @Expose()
  public likesCount: number;

  @ApiProperty({
    description: 'Total amount of comments',
    example: 0,
  })
  @Expose()
  public commentsCount: number;

  @ApiProperty({
    description: 'Post create date'
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'Post update date'
  })
  @Expose()
  public updatedAt: string;

  @ApiProperty({
    description: 'User ID'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Original Author ID'
  })
  @Expose()
  originalAuthor: string;

  @ApiProperty({
    description: 'Tags list'
  })
  @Expose()
  @Type(() => TagRdo)
  public tags: TagRdo[];

  @ApiProperty({
    description: 'Comments list'
  })
  @Expose()
  public comments: Comment[]

  @ApiProperty({
    description: 'Post content',
    example: 'A lot of post content',
  })
  @Expose()
  public content?: string;

  @ApiProperty({
    description: 'Link URL',
    example: 'https://example.com',
  })
  @Expose()
  public linkUrl?: string;

  @ApiProperty({
    description: 'Photo URL',
    example: '/image.jpg',
  })
  @Expose()
  public photoUrl?: string;

  @ApiProperty({
    description: 'Video URL',
    example: 'https://example.com/thisvideo.mp4',
  })
  @Expose()
  public videoUrl?: string;

  @ApiProperty({
    description: 'Quote text',
    example: 'Don`t trouble trouble',
  })
  @Expose()
  public quote?: string;

  @ApiProperty({
    description: 'Quote author',
    example: 'Gordon Cole',
  })
  @Expose()
  public quoteAuthor?: string;
}
