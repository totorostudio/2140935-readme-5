/*
  Warnings:

  - Changed the type of `type` on the `posts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('video', 'text', 'cite', 'photo', 'link');

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "type",
ADD COLUMN     "type" "PostType" NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "quote" DROP NOT NULL,
ALTER COLUMN "quote_author" DROP NOT NULL,
ALTER COLUMN "content" DROP NOT NULL,
ALTER COLUMN "photo_url" DROP NOT NULL,
ALTER COLUMN "video_url" DROP NOT NULL;
