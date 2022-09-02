import { Injectable } from '@nestjs/common';
import { ObjectId, Query } from 'mongoose';
import { CreateVideoDto } from './dto/create-video.dto';
import { VideoRepository } from './video.repository';

@Injectable()
export class VideosService {
  constructor(private readonly videoRepository: VideoRepository) {}
  
  async upsert(createVideoDto: CreateVideoDto) {
    const createOne = await this.videoRepository.upsert(createVideoDto);
    return createOne;
  }

  async findByCategorySubCat(query) {
    return await this.videoRepository.findByCategorySubCat(query);
  }

  async countByCategorySubCat(query) {
    return this.videoRepository.countByCategorySubCat(query);
  }
  
  async findAll() {
    return await this.videoRepository.findAll();
  }

  async findOne(id: ObjectId) {
    return await this.videoRepository.findOne(id);
  }

}
