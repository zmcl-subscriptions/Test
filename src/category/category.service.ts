import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { UpsertCategoryDto } from './dto/upsert-category.dto';

@Injectable()
export class CategoryService {
  private readonly DEFAULT_NAME: string;
  constructor(private readonly categoryRepo : CategoryRepository){}

  async upsert(upsertCategoryDto: UpsertCategoryDto) {
    if(upsertCategoryDto._id && upsertCategoryDto._id.length > 0) {
      console.log("updating existing", upsertCategoryDto);
      const currCat = await this.categoryRepo.findOne(upsertCategoryDto._id);
      if(currCat.subCategories && currCat.subCategories.length > 0){
        console.log("appending", currCat.subCategories);
        currCat.subCategories.push(upsertCategoryDto.subCategories[0])
        upsertCategoryDto.subCategories = currCat.subCategories;
      }
    }
    let subCategories = upsertCategoryDto.subCategories;
    if(!subCategories || subCategories.length === 0){
      console.log("empty subcategory")
      subCategories = [];
    }
    subCategories.forEach(subCat => this.deleteEmptyIds(subCat));
    this.deleteEmptyIds(upsertCategoryDto);
    return this.categoryRepo.upsert(upsertCategoryDto);
  }

  findAll(query) {
    if (query && Object.keys(query).length > 0) {
      return this.categoryRepo.queryCat(query);
    }
    return this.categoryRepo.findAll();
  }

  findOne(id) {
    return this.categoryRepo.findOne(id);
  }

  countDocs(query) {
    return this.categoryRepo.countDocs(query);
  }

  deleteEmptyIds(input) {
    if('_id' in input && input._id.length === 0) {
      console.log('deleting _id if empty');
      delete input._id
    }
  }
}
