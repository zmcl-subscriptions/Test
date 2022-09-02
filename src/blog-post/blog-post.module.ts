import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogPost, BlogPostSchema } from 'src/_schemas/blog-post.schema';
import { BlogPostController } from './blog-post.controller';
import { BlogPostService } from './blog-post.services';
import { BlogPostRepository } from './blog-post.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BlogPost.name, schema: BlogPostSchema }]),
  ],
  controllers: [BlogPostController],
  providers: [BlogPostService, BlogPostRepository],
})
export class BlogPostsModule {}