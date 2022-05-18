import { Controller, Get, Param, Query } from '@nestjs/common';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  
  @Get(':id')
  getFood(@Param('id') id: number): Object {
    return {data: this.foodService.getFood(Number(id))[0]}
  }

  @Get()
  getFoodList(): Object {
    const list = this.foodService.getFoodList()
    return list;
  }
}