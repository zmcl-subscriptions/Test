import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type PostDocument = BlogPost & Document;

@Schema({ versionKey: false, timestamps: true })
export class BlogPost {

  @Prop()
  blogPostId: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  categories: [string];

  @Prop({ ref: 'User', type: SchemaTypes.ObjectId })
  author: Types.ObjectId;

  @Prop()
  likes: string;

  @Prop()
  blogPostStyles:string;

  

}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);