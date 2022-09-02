import { Module } from '@nestjs/common';
import { VideoActionsService } from './video-actions.service';
import { VideoActionsController } from './video-actions.controller';
import { VideoActionsRepository } from './video-actions.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoActions, VideoActionsSchema } from 'src/_schemas/video-actions.schema';
import { VideoRepository } from 'src/videos/video.repository';
import { Video, VideoSchema } from 'src/_schemas/video.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: VideoActions.name, schema: VideoActionsSchema }]),
      MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }])
  ],
  controllers: [VideoActionsController],
  providers: [VideoActionsService, VideoActionsRepository, VideoRepository]
})
export class VideoActionsModule {}
