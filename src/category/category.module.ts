import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/_schemas/category.schema';
import { CategoryRepository } from './category.repository';
import { SubCategory, SubCategorySchema } from 'src/_schemas/sub-category.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Category.name, schema: CategorySchema}]),
            MongooseModule.forFeature([{name: SubCategory.name, schema: SubCategorySchema}])
          ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository]
})
export class CategoryModule {}
