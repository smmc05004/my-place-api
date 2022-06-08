import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodModule } from './food/food.module';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';

@Module({
	imports: [FoodModule, UserModule, FileModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
