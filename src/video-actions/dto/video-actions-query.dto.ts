import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";
import { VideoActionType } from "../enums/video-action-types.enum";

export class VideoActionsQuery {

    @ApiProperty()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsArray()
    types: [VideoActionType];
}