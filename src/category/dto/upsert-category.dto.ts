import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";
import { SubCategoryDto } from "./sub-category.dto";


export class UpsertCategoryDto {
    
    @ApiProperty()
    @IsString()
    _id: string;

    @ApiProperty()
    @IsString()
    categoryName: string;

    @ApiProperty({type: [SubCategoryDto]})
    // @IsArray()
    subCategories: SubCategoryDto[];

}
