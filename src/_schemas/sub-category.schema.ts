import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({ versionKey: false, timestamps: true })
export class SubCategory {

  @Prop()
  subCategoryName:string;
  
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
