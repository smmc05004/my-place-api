import { Controller, Get, Param } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getList(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @Get(':id')
  async getUserByUserId(@Param('id') userId: string): Promise<User | null> {
    return await this.userService.getUserByUserId(userId);
  }
}
