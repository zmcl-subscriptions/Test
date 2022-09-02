import { ApiProperty } from "@nestjs/swagger";
import { IsObject, IsString } from "class-validator";
import { UpdateVideoDto } from "src/videos/dto/update-video.dto";
import { CommentDto } from "./comments.dto";
import { VideoViewActionsDto } from "./view-video-action.dto";

export class UpsertVideoActionDto {

    @ApiProperty()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsString()
    actionType: string;

    @ApiProperty()
    @IsString()
    status: string;

    @ApiProperty()
    @IsObject()
    video: UpdateVideoDto;

    @ApiProperty()
    @IsObject()
    comment: CommentDto;

    @ApiProperty()
    @IsObject()
    view: VideoViewActionsDto;

}