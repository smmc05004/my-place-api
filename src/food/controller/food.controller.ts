import { Controller, Get, Param } from '@nestjs/common';
import { Food } from '@prisma/client';
import { FoodService } from '../service/food.service';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  
  @Get(':id')
  getFood(@Param('id') id: number): Object {
    return {data: this.foodService.getFood(Number(id))[0]}
  }

  @Get()
  async getFoodList(): Promise<Food[]> {
    const list = this.foodService.getAllFoods()
    return list;
  }
}
