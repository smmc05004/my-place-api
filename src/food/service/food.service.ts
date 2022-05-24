import { Get, Injectable } from '@nestjs/common';
import { Food } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { foodList } from '../foodList';

// 0 -> 방문 예정, 1 -> 방문지
@Injectable()
export class FoodService {
  constructor(private prisma: PrismaService) {}
  
  async getAllFoods(): Promise<Food[]> {
    const result = this.prisma.food.findMany() ;
    return result;
  }
  
  @Get()
  getFood(id): Object {
    const food = foodList.filter((food) => (
      food.id === id
    ))

    return food;
  }
}



