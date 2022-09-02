import { IsArray, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogPostDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsArray()
  categories: Array<string>;

  @ApiProperty()
  @IsString()
  author: string;

  @ApiProperty()
  @IsNumber()
  likes: number;
}