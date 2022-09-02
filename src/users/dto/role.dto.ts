import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RoleUserDto {
  @ApiProperty()
  @MaxLength(32)
  @IsString()
  roleId: string;

  @ApiProperty()
  @IsString()
  roleName: string;

  @ApiProperty()
  @IsString()
  userId: string;
}
