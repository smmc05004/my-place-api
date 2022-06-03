import { Injectable } from '@nestjs/common';
import { Food } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FoodCreateDTO } from '../dto/foodCreate.dto';

interface FoodCountProps {
  category: number
}
interface FoodListProps  extends FoodCountProps{
  page: number
}

// 0 -> 방문 예정, 1 -> 방문지
@Injectable()
export class FoodService {
  constructor(private prisma: PrismaService) {}
  
  async getFoods({category, page}: FoodListProps): Promise<Food[]> {
    const rowSize = 10;

    const result = this.prisma.food.findMany({
      skip: (page - 1) * rowSize,
      take: rowSize,
      where:{
        category,
        writerId: 1
      },
      orderBy: {
        id: 'desc'
      },
      include: {
        writer: true
      }
    });
    return result;
  }

  async getFoodsCount({category}: FoodCountProps): Promise<number> {

    const result = await this.prisma.food.count({
      where:{
        category,
        writerId: 1
      },
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
