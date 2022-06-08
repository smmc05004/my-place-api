import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { FileDTO } from 'src/file/dto/fileCreate.dto';

export class FoodCreateDTO {
	@IsString()
	readonly name: string;

	@IsNumber()
	readonly category: number;

	@IsOptional()
	@IsString()
	readonly mainAddress: string;

	@IsOptional()
	@IsString()
	readonly subAddress: string;

	@IsOptional()
	@IsString()
	readonly description: string;

	@IsOptional()
	// date type으로 넘어오는 값도 string으로 받아야 함
	@IsString()
	readonly visitDate: string;

	@IsNumber()
	readonly writerId: number;

	@IsOptional()
	@Type(() => FileDTO)
	attach?: FileDTO;
}
