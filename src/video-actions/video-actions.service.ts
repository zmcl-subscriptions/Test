import { Injectable } from '@nestjs/common';
import { VideoRepository } from 'src/videos/video.repository';
import { UpsertVideoActionDto } from './dto/upsert-video-action.dto';
import { VideoActionType } from './enums/video-action-types.enum';
import { VideoActionsRepository } from './video-actions.repository';

@Injectable()
export class VideoActionsService {
  constructor(private readonly videActionsRepo: VideoActionsRepository, private readonly videoRepository: VideoRepository) {}
  async upsertOne(upsertVideoAction: UpsertVideoActionDto) {
    console.log("Upserting Video Action", upsertVideoAction);
    const actionType = upsertVideoAction.actionType; 
    const query = {
      userId: upsertVideoAction.userId,
      video : {_id: upsertVideoAction.video._id},
      actionType:  { $in: [VideoActionType[0], VideoActionType[2]] }
    };
    const existingLikeDislikeAction = await this.videActionsRepo.query(query);
    const existLikeOrDislikeAction = existingLikeDislikeAction && existingLikeDislikeAction.length !== 0;
    console.log("finally actionType", actionType, query.userId, query.actionType, Number(actionType), VideoActionType.LIKE.toString())
    switch(actionType) {
      case 'LIKE': {
        console.log("increment like count");
        if(existLikeOrDislikeAction) {
          console.log("exist", existingLikeDislikeAction);
          if(existingLikeDislikeAction[0].actionType == 'DISLIKE'){
            console.log("decrementing dislike count");
            this.videoRepository.updateDislikesCount(upsertVideoAction.video._id, -1);
          } else {
            return;
          }
        }
        this.videActionsRepo.upsertOne(query, upsertVideoAction);
        return this.videoRepository.updateLikesCount(upsertVideoAction.video._id, 1);
      }
      case 'DISLIKE': {
        console.log("increment dislike count");
        if(existLikeOrDislikeAction) {
          console.log("exist", existingLikeDislikeAction);
          if(existingLikeDislikeAction[0].actionType == 'LIKE'){
            console.log("decrement like count");
            this.videoRepository.updateLikesCount(upsertVideoAction.video._id, -1);
          } else {
            return;
          }
        }
        this.videActionsRepo.upsertOne(query, upsertVideoAction);
        return this.videoRepository.updateDislikesCount(upsertVideoAction.video._id, 1);
      }
      case 'UN_LIKE': {
        console.log("unliking...");
        if(existLikeOrDislikeAction) {
          console.log("exist unlike", existingLikeDislikeAction);
          let updatedVideo = null;
          if(existingLikeDislikeAction[0].actionType == 'LIKE'){
            console.log("decrement like count for unlike");
            updatedVideo = this.videoRepository.updateLikesCount(upsertVideoAction.video._id, -1);
          }
          this.videActionsRepo.remove(existingLikeDislikeAction[0]._id);
          return updatedVideo;
        }
        break;
      }
      case 'UN_DISLIKE': {
        console.log("undisliking");
        if(existLikeOrDislikeAction) {
          console.log("exist", existingLikeDislikeAction);
          let updatedVid = null;
          if(existingLikeDislikeAction[0].actionType == 'DISLIKE'){
            console.log("decrement dislike count for unlike");
            updatedVid = this.videoRepository.updateDislikesCount(upsertVideoAction.video._id, -1);
          }
          this.videActionsRepo.remove(existingLikeDislikeAction[0]._id);
          return updatedVid;
        }
        break;
      }
      case 'COMMENT': {
        console.log("upserting comments", upsertVideoAction);
        this.videActionsRepo.createOne(upsertVideoAction);
        return this.videoRepository.updateCommentCount(upsertVideoAction.video._id, 1);
      }
      case 'VIEW': {
        console.log("Adding view event of user");
        return this.videActionsRepo.createOne(upsertVideoAction);
      }
      default: {
        console.log("in default");
        break;
      }
    }
  }

  getComments(id: string) {
    const query = {video: { _id: id } };
    return this.videActionsRepo.findComments(query);
  }

  findAll() {
    return this.videActionsRepo.findAll();
  }

  findOne(id: string) {
    return this.videActionsRepo.findOne(id);
  }

  queryActions(id: string, types: string) {
    const actionTypes = types.split(',').map(type => {return type  as keyof typeof VideoActionType})
    console.log("A", actionTypes)
    const query = {
      userId: id, 
      actionType: { $in: actionTypes }
    }
    return this.videActionsRepo.query(query);
  }

  queryComments(id: string) {
    const query = {
      video: {_id: id}, 
      actionType: 'COMMENT'
    }
    return this.videActionsRepo.query(query);
  }
}
