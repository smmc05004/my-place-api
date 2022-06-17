import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodModule } from './food/food.module';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtMiddleware } from './middleware/jwtMiddleware';
import { JwtService } from '@nestjs/jwt';
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.prod',
		}),
		FoodModule,
		UserModule,
		FileModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService, JwtService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(JwtMiddleware).forRoutes(
			{
				path: '/food',
				method: RequestMethod.ALL,
			},
			// {
			// 	path: '/food',
			// 	method: RequestMethod.POST,
			// },
			// {
			// 	path: '/food',
			// 	method: RequestMethod.GET,
			// },
		);
	}
}
