import { Injectable } from '@nestjs/common';
import { Food } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FoodCreateDTO } from '../dto/foodCreate.dto';

interface Props {
  category: number
  page: number
}

// 0 -> 방문 예정, 1 -> 방문지
@Injectable()
export class FoodService {
  constructor(private prisma: PrismaService) {}
  
  async getFoods({category, page}: Props): Promise<Food[]> {
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

  async getFoodsCountt({category, page}: Props): Promise<number> {
    const rowSize = 10;

    const result = await this.prisma.food.count({
      skip: (page - 1) * rowSize,
      take: rowSize,
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
