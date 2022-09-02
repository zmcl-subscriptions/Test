import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class CreateMeetingDto {
    @ApiProperty()
    @IsString()
    meetTitle: string

    @ApiProperty()
    @IsString()
    meetDescription: string

    @ApiProperty()
    @IsString()
    meetDate: string

    @ApiProperty()
    @IsString()
    meetTime: string

}
