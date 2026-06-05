-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "canonical_url" TEXT,
ADD COLUMN     "faq" JSONB,
ADD COLUMN     "meta_description" TEXT,
ADD COLUMN     "meta_title" TEXT,
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "tldr" TEXT;
