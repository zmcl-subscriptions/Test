import { NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDo } from 'src/_schemas/user.do';
import { RoleUserDto } from './dto/role.dto';

export class UsersRepository {
  constructor(
    @InjectModel('User')  
    private userModel: Model<UserDo>,
  ) {}

  async insertMany(userList): Promise<any> {
    try{
      const createList = await this.userModel.insertMany(userList,{ordered:false});
      return createList;
    }catch(error){
      throw new NotAcceptableException(error._message||error.writeErrors);
    }
  }
  async createOne(user): Promise<any> {
    try{
    const createOne = await this.userModel.create(user);
    return createOne; 
  }catch(error){
      throw new NotAcceptableException(error._message||error.writeErrors);
    }
  }
  async updateUserRole(roleDto:RoleUserDto): Promise<any> {
    const createOne = await this.userModel.updateOne({sachUserId:roleDto.userId},
      {$set: { roleName: roleDto.roleName,roleId:roleDto.roleId} },
    );
    return createOne;
  }
  async findOne(userContact:string,userEmail:string): Promise<any> {
    const findOne = await this.userModel.findOne({   $or: [
    {
      userContact: userContact
    },
    {
        userEmail:userEmail
    }
  ],
  $and: [{
    $or:[
      {
        status: { $regex: new RegExp("^" + "active".toLowerCase(), "i") }
      },
      {
          status:{ $regex: new RegExp("^" + "in-active".toLowerCase(), "i") }
      }
    ]
  }
  ]
});
    return findOne;
  }

  async findOneLogin(userId:string): Promise<any> {
    let status= "active"
    const findOne = await this.userModel.findOne({   $or: [
    {
      userContact: userId
    },
    {
        sachUserId:userId
    }
  ],
  $and: [{
    $or:[
      {
        status: { $regex: new RegExp("^" + status.toLowerCase(), "i") }
      }
    ]
  }
  ]  });
    return findOne;
  }


  async findOneById(id): Promise<any> {
    const findOne = await this.userModel.findOne({userContact:id});
    return findOne;
  }
  async find(type:string,page:number): Promise<any> {
    console.log(type);
    
    let json ={}
    if(type == "pending"){
      json = {"status":{ $regex: new RegExp("^" + type.toLowerCase(), "i") }}
    } else if(type == "active"){
      json = {"status":{ $regex: new RegExp("^" + type.toLowerCase(), "i") }}
    } else if(type == "in-active"){
      json = {"status":{ $regex: new RegExp("^" + type.toLowerCase(), "i") }}
    }
    page = Math.max(0, page)
    const results = await this.userModel.find({$or:[{ roleId:null},{ roleId:""}],$and:[json]}).limit(10)
    .skip(page*10).sort({updatedAt:-1});
    return results;
  }
  async findAdminUser(type:string,page:number): Promise<any> {
    console.log(type);
    
    let json ={}
    if(type == "active"){
      json = {"status":{ $regex: new RegExp("^" + type.toLowerCase(), "i") }}
    } else if(type == "in-active"){
      json = {"status":{ $regex: new RegExp("^" + type.toLowerCase(), "i") }}
    }
    page = Math.max(0, page)
    const results = await this.userModel.find({$and:[{ roleId:{ $ne: null }},{ roleId:{ $ne: "" }},json]}).limit(10)
    .skip(page*10).sort({updatedAt:-1});
    return results;
  }
  async getCount(status:string): Promise<any> {
    
    
    const results = await this.userModel.countDocuments({ $or:[{ roleId:null},{ roleId:""}],$and:[{status :{ $regex: new RegExp("^" + status.toLowerCase(), "i") }}]});
    return results;
  }
  async getCountAdmin(status:string): Promise<any> {
    
    const results = await this.userModel.countDocuments({ $and:[{ roleId:{ $ne: null }},{ roleId:{ $ne: "" }},{status :{ $regex: new RegExp("^" + status.toLowerCase(), "i") }}]});
    return results;
  }
  async updateUser(userId:string,fieldName:string,fieldValue:string): Promise<any>{
    let json = {}
    json[fieldName] = fieldValue    
    const results = await this.userModel.findOneAndUpdate({sachUserId:userId},{$set:json},{new: true});
    return results;
  }
}
