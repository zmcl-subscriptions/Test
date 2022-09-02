import { Body, Controller, Get, Param, Post, Render,Query} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { RoleUserDto } from './dto/role.dto';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }
  @Get()
   async getUsers(@Query() query: { type: string,page:number}){
    return this.usersService.find(query.type,query.page);
  }
  @Get('/getAdminUser/all')
   async getAdminUsers(@Query() query: { type: string,page:number}){
    return this.usersService.findAdminUser(query.type,query.page);
  }
  @Post()
  async setUsers(@Body() registerUserDtoList: RegisterUserDto[]) {
    try{
      return this.usersService.insertMany(registerUserDtoList);
    }
    catch (error) {

      throw error
    }
  }
  @Get('/role/all')
  async getRoles() {
    return this.usersService.getRoles();
  }
  @Post('role')
  async createAndUpdateRole(@Body() roleDto: RoleUserDto) {
    return this.usersService.createAndUpdateRole(roleDto);
  }
  @Post('updateRole')
  async updateUserRole(@Body() roleDtoList: RoleUserDto[]) {
    return this.usersService.updateUserRole(roleDtoList);
  }
  @Get('/count/all')
  async getCount() {
    return this.usersService.getCount();
  }
  @Get('/count/all/admin')
  async getCountAdmin() {
    return this.usersService.getCountAdmin();
  }
  @Post('update')
  async updateUser(@Body() userUpdateDto: UserUpdateDto) {
    console.log(userUpdateDto);
    
    return this.usersService.updateUser(userUpdateDto.userId,userUpdateDto.fieldName,userUpdateDto.fieldValue);
  }  

  @Post('findUserAndValidate')
  async findUserAnddValidate(@Body() userDto: RegisterUserDto) {
    return this.usersService.findUser(userDto);
  }
}
