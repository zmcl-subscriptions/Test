import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  body: string;

  @ApiProperty()
  @IsString()
  parentComment: string;

  @ApiProperty()
  @IsNumber()
  level: number;
}
