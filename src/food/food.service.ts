import { Get, Injectable } from '@nestjs/common';
import { log } from 'console';
import { foodList } from './foodList';

// 0 -> 방문 예정, 1 -> 방문지
@Injectable()
export class FoodService {
  
  @Get()
  getFoodList(): Object {
    return {
      data: foodList,
      total: 10
    }
  }
  
  @Get()
  getFood(id): Object {
    const food = foodList.filter((food) => (
      food.id === id
    ))

    return food;
  }
  
}
