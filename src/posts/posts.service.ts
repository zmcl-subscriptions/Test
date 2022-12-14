import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './post.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}
  async create(createPostDto: CreatePostDto) {
    const createOne = await this.postsRepository.createOne(createPostDto);
    return createOne;
  }

  async findAll() {
    return await this.postsRepository.findAll();
  }

  async findOne(id: string) {
    return  await this.postsRepository.findOne(id);
    
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const update = await this.postsRepository.update(id, updatePostDto);
    return update;
  }

  async remove(id: string) {
    const remove = await this.postsRepository.remove(id);
    return remove;
  }

  async createLike(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.findOne(id);
    if (post) {
      const addLikes = parseInt(post.likes) + updatePostDto.likes;
      const update = await this.postsRepository.update(id, {
        ...updatePostDto,
        likes: addLikes,
      });
      return update;
    }
  }
}
