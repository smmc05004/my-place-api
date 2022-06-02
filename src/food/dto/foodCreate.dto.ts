import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

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
}