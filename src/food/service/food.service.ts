import { Injectable } from '@nestjs/common';
import { Food } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FoodCreateDTO } from '../dto/foodCreate.dto';

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
  
  async getFoodById(id: number): Promise<Food | null> {
    const food = await this.prisma.food.findUnique({
      where: {
        id 
      }
    })

    return food;
  }

  async addFood(data: FoodCreateDTO): Promise<Food> {
    return await this.prisma.food.create({ data });
  }
}
