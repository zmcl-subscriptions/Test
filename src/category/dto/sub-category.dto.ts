import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SubCategoryDto {
    @ApiProperty()
    @IsString()
    _id: string;

    @ApiProperty()
    @IsString()
    subCategoryName: string;

}