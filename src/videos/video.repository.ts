import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { VideoDo } from 'src/_schemas/video.do';

export class VideoRepository {

  constructor(
    @InjectModel('Video')
    private videoModel: Model<VideoDo>,
  ) {}

  async updateCommentCount(id: string, incrVal: number) {
    const update = await this.videoModel.findByIdAndUpdate({_id: id}, {$inc: { commentsCount: incrVal}}, {upsert: true});
    return update;
  }

  async upsert(video): Promise<any> {
    const createOne = await video._id ? this.videoModel.findOneAndUpdate({_id: video._id}, video, {upsert: true})
    : this.videoModel.create(video) ;
    return createOne;
  }

  async findByCategorySubCat(query): Promise<any> {
    const queryResult = await this.videoModel.find({categoryId: query.catId, subCategoryId: query.subCatId}).limit(10).skip(query.page*10);
    return queryResult;
  }

  async countByCategorySubCat(query): Promise<any> {
    const queryResult = await this.videoModel.countDocuments({categoryId: query.catId, subCategoryId: query.subCatId});
    return {totalCount: queryResult};
  }

  async findAll(): Promise<any> {
    const findAll = await this.videoModel.find()
    return findAll;
  }

  async findOne(id: ObjectId): Promise<any> {
    const findOne = await this.videoModel.findById(id);
    return findOne;
  }

  async update(id, video): Promise<any> {
    const update = await this.videoModel.findByIdAndUpdate(id, video);
    return update;
  }

  async updateLikesCount(id, val: number): Promise<any> {
    const update = await this.videoModel.findByIdAndUpdate({_id: id}, {$inc: { likesCount: val}}, {upsert: true});
    return update;
  }
  
  async updateDislikesCount(id, val: number): Promise<any> {
    const update = await this.videoModel.findByIdAndUpdate({_id: id}, {$inc: { dislikesCount: val}}, {upsert: true});
    return update;
  }
  
  async remove(id): Promise<any> {
    const remove = await this.videoModel.findByIdAndDelete(id);
    return remove;
  }
}
