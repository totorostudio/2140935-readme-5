import { PostType } from '.prisma/client';
import { UpdateLinkPostDto } from './update-link-post.dto';
import { UpdatePhotoPostDto } from './update-photo-post.dto';
import { UpdateVideoPostDto } from './update-video-post.dto';
import { UpdateQuotePostDto } from './update-quote-post.dto';
import { UpdateTextPostDto } from './update-text-post.dto';

export type UpdateBlogPostDtoType = UpdateTextPostDto | UpdateVideoPostDto | UpdateQuotePostDto | UpdatePhotoPostDto | UpdateLinkPostDto;

export const UpdateBlogPostDto = {
  [PostType.text]: UpdateTextPostDto,
  [PostType.video]: UpdateVideoPostDto,
  [PostType.quote]: UpdateQuotePostDto,
  [PostType.photo]: UpdatePhotoPostDto,
  [PostType.link]: UpdateLinkPostDto,
}
