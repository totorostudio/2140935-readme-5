import { Expose, Type } from 'class-transformer';

import { TagRdo } from '../../blog-tag/rdo/tag.rdo';

export class BlogPostRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public content: string;

  @Expose()
  public createdAt: string;

  @Expose()
  public userId: string;

  @Expose()
  @Type(() => TagRdo)
  public categories: TagRdo[];

  @Expose()
  public comments: Comment[]
}
