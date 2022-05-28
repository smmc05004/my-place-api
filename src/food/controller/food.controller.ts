import { Controller, Get, Param } from '@nestjs/common';
import { Food } from '@prisma/client';
import { FoodService } from '../service/food.service';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get()
  async getFoodList(): Promise<Food[]> {
    return  await this.foodService.getFoods();
  }

  @Get(':id')
  async getFoodById(@Param('id') id: number): Promise<Food | null>  {
    return await this.foodService.getFoodById(Number(id));
  }
}
