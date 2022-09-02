import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";
import { SubCategoryDto } from "./sub-category.dto";

export class CreateCategoryDto {
    
    @ApiProperty()
    @IsString()
    categoryName: string;

    @ApiProperty()
    @IsArray()
    subCategories: [SubCategoryDto];
}
