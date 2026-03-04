import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserSummaryDto } from './dto/user-summary.dto';
import type { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {
  
  constructor(private readonly usersRepository: UsersRepository){}


  //find all users
  async findAll() : Promise<UserSummaryDto[]> {
    return await this.usersRepository.findAll();
  }

  //get user by id
  async findById(id: string) : Promise<UserSummaryDto> {
    const user = await this.usersRepository.findSummaryById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  //update user by id
  async updateById(id: string, data: UpdateUserDto) : Promise<UserSummaryDto> {
    return await this.usersRepository.updateById(id, data);
  }

  //delete user by id
  async deleteById(id: string) : Promise<void> {
    return await this.usersRepository.deleteById(id);
  }
}
