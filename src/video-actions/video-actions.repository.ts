import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VideoActionsDo } from 'src/_schemas/video-actions.do';
import { UpsertVideoActionDto } from './dto/upsert-video-action.dto';

export class VideoActionsRepository {
  async createOne(upsertVideoAction: UpsertVideoActionDto) {
    return await this.videoActionsModel.create(upsertVideoAction);
  }
  constructor(
    @InjectModel('VideoActions')
    private videoActionsModel: Model<VideoActionsDo>,
  ) {}

async upsertOne(query, upsertVideoActionDto): Promise<any> {
    const upsertOne = await this.videoActionsModel.findOneAndUpdate(query, upsertVideoActionDto, {upsert: true});
    return upsertOne;
  }

  // async countLikes(query): Promise<any> {
  //   const findOne = await this.videoActionsModel.countDocuments(query);
  //   return findOne;
  // }

  async findAll(): Promise<any> {
    const findAll = await this.videoActionsModel.find();
    return findAll;
  }

  async findComments(query): Promise<any> {
    const findComms = await this.videoActionsModel.find(query);
    return findComms;
  }

  async findOne(id): Promise<any> {
    const findOne = await this.videoActionsModel.findById(id);
    return findOne;
  }

  async query(query): Promise<any> {
    const queryRes = await this.videoActionsModel.find(query);
    return queryRes;
  }

  async remove(id): Promise<any> {
    const remove = await this.videoActionsModel.findByIdAndDelete(id);
    return remove;
  }
}
