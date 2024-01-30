-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "comments_count" DROP NOT NULL,
ALTER COLUMN "likes_count" DROP NOT NULL;
