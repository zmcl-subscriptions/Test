import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId  } from 'mongoose';

export type VideoDocument = Video & Document;

@Schema({ versionKey: false, timestamps: true })
export class Video {

  @Prop()
  videoId: string;

  @Prop()
  videoURL: string;

  @Prop()
  videoTitle: string;

  @Prop()
  videoDescription: string;

  @Prop()
  categoryId: string;

  @Prop()
  subCategoryId: string;

  @Prop()
  views: number;

  @Prop()
  status: string;

  @Prop()
  likesCount: number;

  @Prop()
  dislikesCount: number;

  @Prop()
  commentsCount: number;

  @Prop()
  videoDuration: number;

  @Prop()
  previewVideoUrl: string;

  @Prop()
  previewVideoId: string;

  @Prop()
  thumbnailUrl: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
