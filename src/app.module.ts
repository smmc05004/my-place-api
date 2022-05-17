import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodController } from './food/food.controller';
import { FoodService } from './food/food.service';
import { TestController } from './test/test.controller';
import { TestService } from './test/test.service';

@Module({
  imports: [],
  controllers: [AppController, TestController, FoodController],
  providers: [AppService, TestService, FoodService],
})
export class AppModule {}
