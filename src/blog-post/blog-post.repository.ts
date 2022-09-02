import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BlogPostDo } from "src/_schemas/blog-post.do";
import { NotAcceptableException } from '@nestjs/common';
export class BlogPostRepository {
    constructor(
      @InjectModel('BlogPost')
      private blogModel: Model<BlogPostDo>,
    ) {}
    async createOne(post): Promise<any> {
      console.log("I am in repository side",post)
      const createOne = await this.blogModel.create(post);
      return createOne;
    }

    async findAll(): Promise<any> {
      const findAll = await this.blogModel.find();
      return findAll;
    }
    async findOne(id): Promise<any> {
      const findOne = await this.blogModel.findById(id);
      return findOne;
    }

}