import { Module } from '@nestjs/common';
import { FoodService } from './service/food.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { FoodController } from './controller/food.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
	controllers: [FoodController],
	providers: [PrismaService, JwtService, FoodService],
})
export class FoodModule {}
