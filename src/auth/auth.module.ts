import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/service/user.service';
import { UserModule } from 'src/user/user.module';
import { jwtContants } from './constant/constant';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './service/jwt.strategy';
import { LocalStrategy } from './service/local.strategy';

@Module({
	imports: [
		UserModule,
		PassportModule,
		JwtModule.register({
			// secret: jwtContants.secret,
			secret: 'SECRETE',
			signOptions: {
				expiresIn: '300s',
			},
		}),
	],
	controllers: [AuthController],
	// providers: [AuthService, LocalStrategy, JwtStrategy],
	providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
