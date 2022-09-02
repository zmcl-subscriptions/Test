import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { UpsertCategoryDto } from './dto/upsert-category.dto';

@ApiTags('Category-Module')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  upsert(@Body() upsertCategoryDto: UpsertCategoryDto) {
    return this.categoryService.upsert(upsertCategoryDto);
  }

  @Get()
  findAll(@Query() query: { searchText: string}) {
    return this.categoryService.findAll(query);
  }

  @Get('/count')
  countDocs(@Query() query : string) {
    return this.categoryService.countDocs(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

}
