import { Prop } from "@nestjs/mongoose";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class VideoViewActionsDto {

    @ApiProperty()
    @IsString()
    deviceId: string;

    @ApiProperty()
    @IsNumber()
    loc_lat: number;

    @ApiProperty()
    @IsNumber()
    loc_long: number;

    @ApiProperty()
    @IsNumber()
    duration: number;
}