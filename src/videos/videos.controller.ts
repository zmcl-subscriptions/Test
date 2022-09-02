import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

@ApiTags('Video-Module')
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videosService.upsert(createVideoDto);
  }

  @Get('/cat-sub-cat')
  findByCategorySubCat(
    @Query('catId') catId: string,
    @Query('subCatId') subCatId: string,
    @Query('page') pageNo: number,) {
    return this.videosService.findByCategorySubCat({"catId": catId, "subCatId": subCatId, page: pageNo});
  }

  @Get('/count')
  countByCategorySubCat(
    @Query('catId') catId: string,
    @Query('subCatId') subCatId: string,) {
    return this.videosService.countByCategorySubCat({"catId": catId, "subCatId": subCatId});
  }

  @Get()
  findAll() {
    return this.videosService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.videosService.findOne(id);
  }
}
