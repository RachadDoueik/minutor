import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserSummaryDto } from '@org/dto';
import type { UpdateUserDto } from '@org/dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  //get user summary by id
  async findSummaryById(id: string): Promise<UserSummaryDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  }


  //get all users
  async findAll(): Promise<UserSummaryDto[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    }));
  }

  //update user by id
  async updateById(id: string, data: UpdateUserDto): Promise<UserSummaryDto> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
    });

    return {
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
    };
  }

  //delete user by id
  async deleteById(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
