import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodModule } from './food/food.module';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [FoodModule, UserModule, FileModule, AuthModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
