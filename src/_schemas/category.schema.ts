import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SubCategory, SubCategorySchema } from './sub-category.schema';

export type CategoryDocument = Category & Document;

@Schema({ versionKey: false, timestamps: true })
export class Category extends Document {
  @Prop()
  userId: string;

  @Prop({unique:true})
  categoryName:string;

  @Prop({type: [SubCategorySchema]})//({ ref: 'SubCategory', type: SchemaTypes.DocumentArray}) //{ ref: 'SubCategory', type: SchemaTypes.ObjectId }
  subCategories: [SubCategory];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
CategorySchema.index({'$**': 'text'});