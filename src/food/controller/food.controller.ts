import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Food } from '@prisma/client';
import { FoodCreateDTO } from '../dto/foodCreate.dto';
import { FoodService } from '../service/food.service';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get()
  async getFoodList(): Promise<{data: Food[], total: number}> {
    const list = await this.foodService.getFoods();
    
    return {
      data: list,
      total: 15
    };
  }

  @Get(':id')
  async getFoodById(@Param('id') id: number): Promise<Food | null>  {
    return await this.foodService.getFoodById(Number(id));
  }

  @Post()
  async addFood(@Body() food: FoodCreateDTO) {
    return await this.foodService.addFood(food);
  }
}
