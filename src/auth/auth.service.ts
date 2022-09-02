import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { use } from 'passport';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userId, password): Promise<any> {
    const user = await this.usersService.findOneLogin(userId); 
       
    if (!user) {
      throw new NotFoundException('User not found or in-active');
    }

    const isMatch = await bcrypt.compare(password, user.userPassword);
    if (isMatch) {
      return user;
    }else{
      throw new NotFoundException('Password not Match');
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(
      loginUserDto.userId,
      loginUserDto.password,
    );

    if(user){
      let role;
      if(user.roleId && user.roleId != ""){
         role = await this.usersService.getRoleById(user.roleId);
      }
      user.userPassword =null
      const payload = {
        user,
        role,
        sub: user._id,
      };
      return {
        access_token: this.jwtService.sign(payload),
        isAdmin:user.roleId && user.roleId != "",
      };
    }
  }

  async register(registerUserDto: RegisterUserDto) {
    const userContact = await this.usersService.findOne(registerUserDto.userContact,registerUserDto.userEmail);
    if (userContact) {
      throw new HttpException(
        'User with this Info already exist(Accout can be in-active state also)',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!registerUserDto.userPassword) {
      throw new HttpException(
        'User with No password',
        HttpStatus.BAD_REQUEST,
      );
    }
    let reg = /^(\+91?)?[0]?(91)?[6789]\d{9}$/gi
    if(!reg.test(registerUserDto.userContact)){
      throw new HttpException(
        'User Contact is invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!re.test(registerUserDto.userEmail)){
      throw new HttpException(
        'User Email is invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(registerUserDto.userPassword, saltOrRounds);
    const seq = await this.usersService.getCounter()
    if(seq){
      registerUserDto.status ="active"
      registerUserDto.sachUserId =  "DSC-"+seq.seq
    }
    const createOne = await this.usersService.createOne({
      ...registerUserDto,
        userPassword: hash,
    }
    );  
    return  createOne 
    
  }
}