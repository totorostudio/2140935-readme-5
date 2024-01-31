import { Post } from '@project/libs/shared/app/types';
import { PostType } from '.prisma/client';
import { QuotePostEntity, LinkPostEntity, PhotoPostEntity, TextPostEntity, VideoPostEntity } from './entity/index';

export type BlogPostEntityType = TextPostEntity | VideoPostEntity | LinkPostEntity | PhotoPostEntity | QuotePostEntity;

export const PostEntityAdapter = {
  [PostType.text]: TextPostEntity,
  [PostType.video]: VideoPostEntity,
  [PostType.quote]: QuotePostEntity,
  [PostType.photo]: PhotoPostEntity,
  [PostType.link]: LinkPostEntity,
}

export function PostEntityFactory (post: Post): BlogPostEntityType {
  const PostEntityConstructor = PostEntityAdapter[post.type];

  if (PostEntityConstructor) {
    return new (PostEntityConstructor as new (post: Post) => BlogPostEntityType)(post);
  } else {
    throw new Error(`Unsupported post type: ${post.type}`);
  }
}
