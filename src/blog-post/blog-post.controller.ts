import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BlogPostService } from './blog-post.services';
import { CreateBlogPostDto } from './dto/create-blog.dto';


@ApiTags('Blogs-Module')
@Controller('blog-post')
export class BlogPostController {

    constructor(private readonly blogPostService: BlogPostService) {}

   
  
    @Post()
    // @Render('create-post')
     async create(@Body() createPostDto: CreateBlogPostDto) {
      console.log("I am in the controller:::"+createPostDto)
       return this.blogPostService.create(createPostDto);
     }

     @Get()
     findAll(): Promise<any> {
       return this.blogPostService.findAll();
     }


 // @UseGuards(JwtAuthGuard)
 @Get(':id')
 //@Render('post')
 async findOne(@Param('id') id: string) {
   return this.blogPostService.findOne(id);
 }


}