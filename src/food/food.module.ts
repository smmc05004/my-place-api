import { Module } from '@nestjs/common';
import { FoodService } from './service/food.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { FoodController } from './controller/food.controller';

@Module({
  controllers: [ FoodController ],
  providers: [ PrismaService, FoodService ]
})
export class FoodModule {}
