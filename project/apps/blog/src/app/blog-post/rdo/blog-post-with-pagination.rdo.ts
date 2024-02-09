import { Expose } from 'class-transformer';
import { BlogPostRdo } from './blog-post.rdo';
import { PaginationResult } from '@project/libs/shared/app/types';

export class BlogPostWithPaginationRdo implements PaginationResult<BlogPostRdo> {
  @Expose()
  public entities: BlogPostRdo[];

  @Expose()
  public totalPages: number;

  @Expose()
  public totalItems: number;

  @Expose()
  public currentPage: number;

  @Expose()
  public itemsPerPage: number;
}
