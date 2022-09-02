import { Types } from 'mongoose';
import { SubCategoryDo } from './sub-category.do';

export class CategoryDo {
  _id: Types.ObjectId;
  categoryName: string;
  subCategories: [SubCategoryDo];

  constructor(props: Partial<CategoryDo>) {
    this._id = props._id;
    this.categoryName = props.categoryName || null;
    this.subCategories = props.subCategories || [null];
  }
}
