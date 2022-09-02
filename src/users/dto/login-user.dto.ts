import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @MaxLength(11)
  @IsString()
  userContact: string;

  @MaxLength(32)
  @IsString()
  userEmail: string;

  @ApiProperty()
  @MaxLength(32)
  @IsString()
  userId: string;


  @ApiProperty()
  @IsString()
  password: string;
}
