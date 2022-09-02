import { Types } from 'mongoose';
import { CommentDto } from 'src/video-actions/dto/comments.dto';
import { VideoViewActionsDto } from 'src/video-actions/dto/view-video-action.dto';
import { VideoDo } from './video.do';

export class VideoActionsDo {
  _id: Types.ObjectId;
  userId: string;
  actionType: string;
  status: string;
  video: VideoDo;
  comment: CommentDto;
  view: VideoViewActionsDto;

  constructor(props: Partial<VideoActionsDo>) {
    this._id = props._id;
    this.userId = props.userId || null;
    this.actionType = props.actionType || null;
    this.status = props.status || null;
    this.video = props.video || null;
    this.comment = props.comment || null;
    this.view = props.view || null;
  }
}
