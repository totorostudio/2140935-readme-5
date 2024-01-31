import { PostType } from '.prisma/client';
import { CreateLinkPostDto } from './create-link-post.dto';
import { CreatePhotoPostDto } from './create-photo-post.dto';
import { CreateVideoPostDto } from './create-video-post.dto';
import { CreateQuotePostDto } from './create-quote-post.dto';
import { CreateTextPostDto } from './create-text-post.dto';

export type CreateBlogPostDtoType = CreateTextPostDto | CreateVideoPostDto | CreateQuotePostDto | CreatePhotoPostDto | CreateLinkPostDto;

export const CreateBlogPostDto = {
  [PostType.text]: CreateTextPostDto,
  [PostType.video]: CreateVideoPostDto,
  [PostType.quote]: CreateQuotePostDto,
  [PostType.photo]: CreatePhotoPostDto,
  [PostType.link]: CreateLinkPostDto,
}
