import { Types } from 'mongoose';

export class VideoDo {
  _id: Types.ObjectId;
  videoURL: string;
  videoTitle: string;
  videoDescription: string;
  status: string;
  categoryId: string;
  subCategoryId: string;
  views: number;
  softDeleted: string;
  likesCount: number;
  dislikesCount: number;
  commentsCount: number;
  videoDuration: number;
  previewVideoUrl: string;
  previewVideoId: string;

  constructor(props: Partial<VideoDo>) {
    this._id = props._id;
    this.videoURL = props.videoURL || null;
    this.videoTitle = props.videoTitle || null;
    this.videoDescription = props.videoDescription || null;
    this.categoryId = props.categoryId || null;
    this.subCategoryId = props.subCategoryId || null;
    this.views = props.views || null;
    this.softDeleted = props.softDeleted || null;
    this.likesCount = props.likesCount || null;
    this.dislikesCount = props.dislikesCount || null;
    this.commentsCount = props.commentsCount || null;
    this.videoDuration = props.videoDuration || null;
    this.previewVideoUrl = props.previewVideoUrl || null;
    this.previewVideoId = props.previewVideoId || null;
  }
}
