import { HttpStatus } from '@nestjs/common';
import { HttpException, NotFoundException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorConstants } from 'src/constants/ErrorConstants';
import { CategoryDo } from 'src/_schemas/category.do';

export class CategoryRepository {
  constructor(
    @InjectModel('Category')
    private categoryModel: Model<CategoryDo>,
  ) {}

  async upsert(category): Promise<any> {
    let createOne;
    try {
      createOne = await category._id ? this.categoryModel.findOneAndUpdate({_id: category._id}, category, {upsert: true})
      : await this.categoryModel.create(category) ;
    } catch(error) {
      throw new HttpException( (error as Error).message, HttpStatus.BAD_REQUEST );
    }
    return createOne;
  }

  async queryCat(query): Promise<any> {
    const json =  {$text: {$search: query.searchText}};
    let data;
    try {
      data = await this.categoryModel.find(json).sort({eventDateTime: 1});
  } catch (error) {
      throw new NotFoundException(ErrorConstants.ERROR, error);
  }
    return data;
  }

  async countDocs(query): Promise<any> {
    console.log("counting...", query)
    const json = Object.keys(query).length > 0 ? {$text: {$search: query.searchText}}: {};
    const totalCount = await this.categoryModel.countDocuments(json);
    return {totalCount: totalCount};
  }

  async findAll(): Promise<any> {
    const findAll = await this.categoryModel.find();
    return findAll;
  }

  async findOne(id): Promise<any> {
    const findOne = await this.categoryModel.findById(id);
    return findOne;
  }

  async update(id, video): Promise<any> {
    const update = await this.categoryModel.findByIdAndUpdate(id, video);
    return update;
  }

  async updateLikesCount(id, val: number): Promise<any> {
    const update = await this.categoryModel.findByIdAndUpdate({_id: id}, {$inc: { likesCount: val}}, {upsert: true});
    return update;
  }
  
  async updateDislikesCount(id, val: number): Promise<any> {
    const update = await this.categoryModel.findByIdAndUpdate({_id: id}, {$inc: { dislikesCount: val}}, {upsert: true});
    return update;
  }
  
  async remove(id): Promise<any> {
    const remove = await this.categoryModel.findByIdAndDelete(id);
    return remove;
  }
}
