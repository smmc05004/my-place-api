import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(
		new ValidationPipe({
			// 엔티티 데코레이터에 없는 프로퍼티 값은 거름
			// dto 정의와 다른 값이 들어오면 아예 받지를 않음
			whitelist: true,
			// 엔티티 데코레이터에 없는 값이 들어오면 그 값에 대한 에러 메세지 생성
			forbidNonWhitelisted: true,
			// 컨트롤러가 값을 받을 때, 지정된 타입으로 형변환
			transform: true,
		}),
	);

	app.enableCors();

	await app.listen(4000);
}
bootstrap();
