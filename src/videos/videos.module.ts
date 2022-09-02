import { Module, Post } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { VideoRepository } from './video.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoSchema } from 'src/_schemas/video.schema';
import { Video } from 'src/_schemas/video.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
  ],
  controllers: [VideosController],
  providers: [VideosService, VideoRepository]
})
export class VideosModule {}
