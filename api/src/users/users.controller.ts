import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SelfGuard } from '../auth/guards/self.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //get all users endpoint
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  //get user by id endpoint
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.usersService.findById(id);
  }

  //update user by id endpoint
  @UseGuards(JwtAuthGuard, SelfGuard)
  @Patch(':id')
  async updateById(@Param('id') id: string, @Body() data: any) {
    return await this.usersService.updateById(id, data);
  }

  //delete user by id endpoint
  @UseGuards(JwtAuthGuard, SelfGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id') id: string) {
    await this.usersService.deleteById(id);
  }
}
