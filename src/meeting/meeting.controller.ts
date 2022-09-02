import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Meeting-Module')
@Controller('meeting')
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @Post()
  create(@Body() createMeetingDto: CreateMeetingDto) {
    return this.meetingService.create(createMeetingDto);
  }

}
