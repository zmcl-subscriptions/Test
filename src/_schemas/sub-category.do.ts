import { Types } from 'mongoose';

export class SubCategoryDo {
  _id: Types.ObjectId;
  subCategoryName: string;

  constructor(props: Partial<SubCategoryDo>) {
    this._id = props._id;
    this.subCategoryName = props.subCategoryName || null;
  }
}
