import { Injectable } from "@nestjs/common";
import { BlogPostRepository } from "./blog-post.repository";
import { CreateBlogPostDto } from "./dto/create-blog.dto";


@Injectable()
export class BlogPostService {

    private readonly DEFAULT_NAME: string;
    constructor(private readonly blogRepo : BlogPostRepository){}

    async create(createPostDto: CreateBlogPostDto) {
      console.log("I am in service",createPostDto);
      const createOne = await this.blogRepo.createOne(createPostDto);
      return createOne;
    }
    async findAll() {
      return await this.blogRepo.findAll();
    }
    async findOne(id: string) {
      return  await this.blogRepo.findOne(id);
      
    }

}