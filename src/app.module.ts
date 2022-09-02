import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VideosModule } from './videos/videos.module';
import { VideoActionsModule } from './video-actions/video-actions.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { CategoryModule } from './category/category.module';
import { MeetingModule } from './meeting/meeting.module';
import { BlogPostsModule } from './blog-post/blog-post.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.SACH_CORE_SERVICE_DB),
    PostsModule,
    AuthModule,
    UsersModule,
    VideosModule,
    VideoActionsModule,
    CategoryModule,
    MeetingModule,
    BlogPostsModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {configure(consumer: MiddlewareConsumer) {
  consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
}
}

