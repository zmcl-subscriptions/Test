import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import e from 'express';
import { CounterRepository } from './counter.repository';
import { RegisterUserDto } from './dto/register-user.dto';
import { RoleUserDto } from './dto/role.dto';
import { RoleRepository } from './roles.repository';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly roleRepository: RoleRepository,
    private readonly counterRepository: CounterRepository,
    

    ) {}

  async findOne(userContact:string,userEmail:string): Promise<any> {
    return this.usersRepository.findOne(userContact,userEmail);
  }
  async findOneLogin(userId:string): Promise<any> {
    return this.usersRepository.findOneLogin(userId);
  }

  async findOneById(id): Promise<any> {
    const findOneById = await this.usersRepository.findOneById(id);
    return findOneById;
  }
  async find(type:string,page:number): Promise<any> {
    const results = await this.usersRepository.find(type,page);
    return results;
  }
  async findAdminUser(type:string,page:number): Promise<any> {
    const results = await this.usersRepository.findAdminUser(type,page);
    return results;
  }
  async insertMany(userList): Promise<any> {
    try{
      const results = await this.usersRepository.insertMany(userList);
      return results;
    }catch (e) {
      throw e
  }
  }

  async createOne(user): Promise<any> {
    const createOne = await this.usersRepository.createOne(user);
    return createOne;
  }

  async createAndUpdateRole(roleDto:RoleUserDto): Promise<any> {
    const createOne = await this.roleRepository.createAndUpdateRole(roleDto);
    return createOne;
  }
  async updateUserRole(roleDtoList:RoleUserDto[]): Promise<any> {
     roleDtoList.forEach(async roleDto => {
      const createOne = await this.usersRepository.updateUserRole(roleDto)
      return createOne;
     });
  }
  async getRoles(): Promise<any> {
    const roles = await this.roleRepository.getAll();
    return roles;
  }
  async getRoleById(id:string): Promise<any> {
    const role = await this.roleRepository.getByRoleId(id);
    return role;
  }
  async getCounter(): Promise<any> {
    const seq = await this.counterRepository.getSeq();
    return seq;
  }
  async getCount(): Promise<any> {
    
    const pendingCount = await this.usersRepository.getCount("pending");
    const activeCount = await this.usersRepository.getCount("active");
    const inActiveCount = await this.usersRepository.getCount("in-active");
    return {pendingCount,activeCount,inActiveCount};
  }
  async getCountAdmin(): Promise<any> {
        const activeCount = await this.usersRepository.getCount("active");
    const inActiveCount = await this.usersRepository.getCount("in-active");
    return {activeCount,inActiveCount};
  }
  async updateUser(userId:string,fieldName:string,fieldValue:string): Promise<any> {
     const updateUser = await this.usersRepository.updateUser(userId,fieldName,fieldValue)
     return updateUser
  }
  async findUser(userDto: RegisterUserDto) {
    const userContact = await this.usersRepository.findOne(userDto.userContact,userDto.userEmail);
    if (userContact) {
      throw new HttpException(
        'User with this Info already exist(Accout can be in-active state also)',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!userDto.userFullName) {
      throw new HttpException(
        'User Namme is Mandatory',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!userDto.userPassword) {
      throw new HttpException(
        'Password is Mandatory',
        HttpStatus.BAD_REQUEST,
      );
    }
    let reg = /^(\+91?)?[0]?(91)?[6789]\d{9}$/gi
    if(!reg.test(userDto.userContact)){
      throw new HttpException(
        'User Contact is invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!re.test(userDto.userEmail)){
      throw new HttpException(
        'User Email is invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
    throw new HttpException(
      'User is valid for registration',
      HttpStatus.OK,
    );  
    
  }
  
}
