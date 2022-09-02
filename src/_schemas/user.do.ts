import { Types } from 'mongoose';

export class UserDo {
  _id: Types.ObjectId;
  userFullName  : string;
  userPassword: string;
  userContact: string;
  userEmail: string;
  roleId: string |null;
  roleName: string |null;
  passwordSalt: string | null;
  sachUserId:string|null;
  status: string |null;

  constructor(props: Partial<UserDo>) {
    this._id = props._id;
    this.userFullName = props.userFullName || null;
    this.userPassword = props.userPassword || null;
    this.userContact = props.userContact || null;
    this.userEmail = props.userEmail || null;
    this.roleId = props.roleId || null;
    this.roleName = props.roleName || null;
    this.passwordSalt = props.passwordSalt || null;
    this.sachUserId=props.sachUserId||null;
    this.status=props.status||null;
  }
}


export class RoleDo {
  _id: Types.ObjectId;
  roleId  : string;
  roleName: string;
  accessibleList: Permission[];
  constructor(props: Partial<RoleDo>) {
    this._id = props._id;
    this.roleId = props.roleId || null;
    this.roleName = props.roleName || null;
    this.accessibleList = props.accessibleList || null;
  }
}

export class Permission {
  name  : string;
  value: boolean;
  constructor(props: Partial<Permission>) {
    this.name = props.name || null;
    this.value = props.value || null;
  }
}

export class CounterDo {
  _id: Types.ObjectId;
  seq  : Number;
  constructor(props: Partial<CounterDo>) {
    this._id = props._id;
    this.seq = props.seq || null;
  }
}