import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Query,
	Req,
	UseGuards,
} from '@nestjs/common';
import { Food } from '@prisma/client';
import { Request } from 'express';
import { JwtAuthGard } from 'src/auth/service/jwt-auth.guard';
import { FoodCreateDTO } from '../dto/foodCreate.dto';
import { FoodService } from '../service/food.service';

@Controller('food')
export class FoodController {
	constructor(private readonly foodService: FoodService) {}

	@Get()
	@UseGuards(JwtAuthGard)
	async getFoodList(
		@Req() req: Request,
		@Query('category') category: number,
		@Query('page') page: number,
	): Promise<{ data: Food[]; total: number }> {
		const list = await this.foodService.getFoods({ category, page });
		const count = await this.foodService.getFoodsCount({ category });

		return {
			data: list,
			total: count,
		};
	}

	@Get(':id')
	async getFoodById(@Param('id') id: number): Promise<{ data: Food | null }> {
		return {
			data: await this.foodService.getFoodById(id),
		};
	}

	@Post()
	async addFood(@Body() food: FoodCreateDTO): Promise<{ data: Food }> {
		return {
			data: await this.foodService.addFood({
				...food,
				writer: {
					connect: {
						id: food.writer,
					},
				},
				attach: { create: food.attach },
			}),
		};
	}
}
