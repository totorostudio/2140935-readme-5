import { Tag } from './tag.interface';

export interface BasePost {
  id?: string;
  title: string;
  tags: Tag[];
  description: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId: string;
  comments: Comment[];
}
