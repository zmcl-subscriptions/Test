import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleDo, UserDo } from 'src/_schemas/user.do';
import { RegisterUserDto } from './dto/register-user.dto';
import { RoleUserDto } from './dto/role.dto';

export class RoleRepository {
  constructor(
    @InjectModel('Role')
    private roleModel: Model<RoleDo>,
  ) {}

  async createAndUpdateRole(roleDto:RoleUserDto): Promise<any> {
    const findOne = await this.roleModel.findOneAndUpdate({roleId:roleDto.roleId,roleName:roleDto.roleName},roleDto,{upsert:true});
    return findOne;
  }
  async getAll(): Promise<any> {
    const roles = await this.roleModel.find();
    return roles;
  }
  async getByRoleId(id:string): Promise<any> {
    const role = await this.roleModel.findOne({roleId:id});
    return role;
  }
  
}
