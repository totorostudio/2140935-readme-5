import { QuotePost } from '@project/libs/shared/app/types';
import { PostType } from '.prisma/client';
import { Entity } from '@project/shared/core';
import { BlogTagEntity } from '../../blog-tag/blog-tag.entity';
import { CreateQuotePostDto } from '../dto/create-quote-post.dto';
import { BasePostEntity } from './base-post.entity';

export class QuotePostEntity extends BasePostEntity implements QuotePost, Entity<string, QuotePost> {
  public quote: string;
  public quoteAuthor: string;

  constructor (post: QuotePost) {
    super(post);
  }

  public populate(data: QuotePost): QuotePostEntity {
    super.populate(data);
    this.quote = data.quote;
    this.quoteAuthor = data.quoteAuthor;

    return this;
  }

  public toPOJO(): QuotePost {
    return {
      ...super.toPOJO(),
      quote: this.quote,
      quoteAuthor: this.quoteAuthor
    }
  }

  static fromObject(data: QuotePost): QuotePostEntity {
    return new QuotePostEntity(data)
      .populate(data);
  }

  static fromDto(dto: CreateQuotePostDto, tags: BlogTagEntity[]): QuotePostEntity {
    const quotePost: QuotePost = {
      ...dto,
      type: PostType.quote,
      comments: [],
      tags: tags.map(tag => tag.toPOJO()),
      isRepost: dto.isRepost ?? undefined,
      isDraft: dto.isDraft ?? undefined,
    };

    const entity = new QuotePostEntity(quotePost);

    return entity;
  }
}
