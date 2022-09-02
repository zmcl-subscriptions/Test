import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { isEmail, isPhoneNumber } from 'class-validator';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ versionKey: false, timestamps: true })
export class User {
  @Prop({ required: true })
  userFullName: string;

  @Prop()
  userPassword: string;

  @Prop( {required:true, unique:true,validate: [isPhoneNumber, 'Please fill a valid Phone Number']})

  userContact: string;

  @Prop( {required:true, unique:true,validate: [isEmail, 'Please fill a valid Email Address'] })
  userEmail: string;

  @Prop()
  roleId: string;

  @Prop()
  roleName: string;

  @Prop()
  sachUserId : string;

  @Prop()
  status : string;

  @Prop()
  passwordSalt: string | null;
}

@Schema({ versionKey: false, timestamps: true })
export class Role {
  @Prop({ required: false, index: true })
  roleId: string;

  @Prop()
  roleName: string;

  @Prop()
  accessibleList: Permission[];
}


@Schema({ versionKey: false, timestamps: true })
export class Permission {
  @Prop()
  name: string;

  @Prop()
  value: boolean;
}


@Schema({ versionKey: false, timestamps: true })
export class Counter {
  @Prop({ required: false})
  seq: Number;
}
export const UserSchema = SchemaFactory.createForClass(User);
export const RoleSchema = SchemaFactory.createForClass(Role);
export const CounterSchema = SchemaFactory.createForClass(Counter);

