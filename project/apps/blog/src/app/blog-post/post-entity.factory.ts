import { PostType, Post } from '@project/libs/shared/app/types';
import { QuotePostEntity, LinkPostEntity, PhotoPostEntity, TextPostEntity, VideoPostEntity } from './entity/index';
import { BlogPostEntity } from './entity/blog-post.entity';

export const PostEntityAdapter = {
  [PostType.TEXT]: TextPostEntity,
  [PostType.VIDEO]: VideoPostEntity,
  [PostType.QUOTE]: QuotePostEntity,
  [PostType.PHOTO]: PhotoPostEntity,
  [PostType.LINK]: LinkPostEntity,
}

export function PostEntityFactory (post: Post): BlogPostEntity {
  const PostEntityConstructor = PostEntityAdapter[post.type];

  if (PostEntityConstructor) {
    return new (PostEntityConstructor as new (post: Post) => BlogPostEntity)(post);
  } else {
    throw new Error(`Unsupported post type: ${post.type}`);
  }
}
