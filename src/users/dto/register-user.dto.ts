import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty()
  @MaxLength(64)
  @IsString()
  userFullName: string;

  @ApiProperty()
  @IsString()
  userPassword: string;

  @ApiProperty()
  @IsString()
  userContact: string;

  @ApiProperty()
  @IsString()
  userEmail: string;
  @ApiProperty()
  @IsString()
  status: string;
  
  @ApiProperty()
  @IsString()
  sachUserId: string;

  @IsString()
  passwordSalt: null;
}
