import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// Json : http://jsonblob.com/1006303646287413248
export class CreateVideoDto {

  @ApiProperty()
  @IsString()
  _id: string;
  
  @ApiProperty()
  @IsString()
  videoURL: string;

  @ApiProperty()
  @IsString()
  videoTitle: string;

  @ApiProperty()
  @IsString()
  videoDescription: string;

  @ApiProperty()
  @IsString()
  categoryId: string;

  @ApiProperty()
  @IsString()
  subCategoryId: string;

  @ApiProperty()
  @IsNumber()
  views: number;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsNumber()
  likesCount: number;

  @ApiProperty()
  @IsNumber()
  dislikesCount: number;

  @ApiProperty()
  @IsNumber()
  commentsCount: number;

  @ApiProperty()
  @IsNumber()
  videoDuration: number;

  @ApiProperty()
  @IsString()
  previewVideoUrl: string;

  @ApiProperty()
  @IsString()
  previewVideoId: string
  }
