import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateDto {
  @ApiProperty()
  @MaxLength(32)
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  fieldName: string;

  @ApiProperty()
  @IsString()
  fieldValue: string;
}
