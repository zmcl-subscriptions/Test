import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User,Role, RoleSchema, Counter, CounterSchema } from 'src/_schemas/user.schema';
import { UsersRepository } from './users.repository';
import { UsersController } from './users.controller';
import { RoleRepository } from './roles.repository';
import { CounterRepository } from './counter.repository';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema },{ name: Role.name, schema: RoleSchema},{ name: Counter.name, schema: CounterSchema}]),
  ],
  providers: [UsersService, UsersRepository,RoleRepository,CounterRepository],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
