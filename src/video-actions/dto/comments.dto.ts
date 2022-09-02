import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty()
  @IsString()
  body: string;

  @ApiProperty()
  @IsString()
  parentComment: string;

  @ApiProperty()
  @IsNumber()
  level: number;

  @ApiProperty()
  @IsNumber()
  likesCount: number;

  @ApiProperty()
  @IsNumber()
  dislikesCount: number;
}
