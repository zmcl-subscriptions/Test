import { Controller, Get, Post, Body, Patch, Param, Req, Query } from '@nestjs/common';
import { VideoActionsService } from './video-actions.service';
import { UpsertVideoActionDto } from './dto/upsert-video-action.dto';
import { UpdateVideoActionDto } from './dto/update-video-action.dto';
import { ApiTags } from '@nestjs/swagger';
import { VideoActionsQuery } from './dto/video-actions-query.dto';
import { VideoActionType } from './enums/video-action-types.enum';

@ApiTags('Video-Actions-Module')
@Controller('video-actions')
export class VideoActionsController {
  constructor(private readonly videoActionsService: VideoActionsService) {}

  @Post('/upsertAction')
  commentAction(@Body() upsertVideoActionDto: UpsertVideoActionDto) {
    return this.videoActionsService.upsertOne(upsertVideoActionDto);
  }

  @Get('/userActions')
  queryActions(@Query('userId') id: string, @Query('types') types: string) {
    return this.videoActionsService.queryActions(id, types);
  }

  @Get('/comments/:videoId')
  videoActions(@Param('videoId') id: string) {
    return this.videoActionsService.queryComments(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoActionsService.findOne(id);
  }

  @Get()
  findAll() {
    return this.videoActionsService.findAll();
  }

}
