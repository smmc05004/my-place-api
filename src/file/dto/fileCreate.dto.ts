import { IsString } from 'class-validator';

export class FileDTO {
	@IsString()
	type: string;
	@IsString()
	name: string;
}
