import { Get, Injectable } from '@nestjs/common';
import { Food } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

// 0 -> 방문 예정, 1 -> 방문지
@Injectable()
export class FoodService {
  constructor(private prisma: PrismaService) {}
  
  async getFoods(): Promise<Food[]> {
    const result = this.prisma.food.findMany({
      include: {
        writer: true
      }
    });
    return result;
  }
  
  @Get()
  async getFoodById(id: number): Promise<Food | null> {
    const food = await this.prisma.food.findUnique({
      where: {
        id 
      }
    })

    return food;
  }

  async addFood(data: Food): Promise<Food> {
    return await this.prisma.food.create({ data });
  }
}



