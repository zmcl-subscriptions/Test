import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Video } from './video.schema';
import { CommentDto } from 'src/video-actions/dto/comments.dto';
import { VideoViewActionsDto } from 'src/video-actions/dto/view-video-action.dto';

export type VideoActionsDocument = VideoActions & Document;

@Schema({ versionKey: false, timestamps: true })
export class VideoActions {
  @Prop()
  userId: string;
  
  @Prop()
  actionType: string;
  
  @Prop()
  status: string;
  
  @Prop({ ref: 'Video', type: SchemaTypes.ObjectId })
  video: Video;
  
  @Prop()
  comment: CommentDto;
  
  @Prop()
  view: VideoViewActionsDto;
}

export const VideoActionsSchema = SchemaFactory.createForClass(VideoActions);
