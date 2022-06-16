import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGard } from '../service/jwt-auth.guard';
import { LocalAuthGard } from '../service/local-auth.guard';
import { AuthService } from '../service/auth.service';
import { Request, Response } from 'express';
import { RefreshAuthGuard } from '../guard/refresh-auth.guard';

// @UseGuards가 있으면 그에 맞는 strategy를 실행
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	// LocalStrategy 클래스의 validate 실행
	@UseGuards(LocalAuthGard)
	@Post('/login')
	async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		const user = req.user;

		try {
			// 반환된 token에는 토큰 생성시 payload로 전달한 데이터가 저장되어 있음
			const access_token = await this.authService.getAccessToken(user);
			const refreshToken = await this.authService.getRefreshToken(user);

			res.setHeader('Authorization', `Bearer ${access_token}; path=/;`);

			res.cookie('jwt_access_token', access_token, {
				httpOnly: true,
				maxAge: 1000 * 3,
			});

			res.cookie('jwt_refresh_token', refreshToken, {
				httpOnly: true,
				maxAge: 1000 * 60 * 60 * 24,
			});

			return { data: user };
		} catch (error) {
			console.log('error: ', error);
			return res.status(500).json({ message: 'Token Broken' });
		}
	}

	// JwtStrategy 클래스의 validate 실행
	// @UseGuards(JwtAuthGard)
	// @Get('/profile')
	// async getProfile(@Req() req: Request) {
	// 	return req.user;
	// }

	@Get('/verify')
	async verifyToken(@Req() req: Request, @Res() res: Response) {
		const cookie = req.cookies['jwt_access_token'];

		if (!cookie) {
			res.status(500).json({ message: 'No Cookie' });
		}

		try {
			const data = await this.authService.verifyToken(cookie);

			return res.status(200).json(data);
		} catch (error) {
			console.log('error: ', error);
			return res.status(500).json({ message: 'jwt expired' });
		}
	}

	// RefreshStrategy 클래스의 validate 실행
	// refresh token을 rand-token이라는 라이브러리로 생성했을 때는 동작을 안 해서
	// jwt로 refresh용 토큰을 새로 발급 받았더니 동작
	// => jwt Strategy에서 jwt토큰을 확인하는 뭔가가 있나봄
	@UseGuards(RefreshAuthGuard)
	@Get('/refresh')
	async refreshTokens(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	) {
		const user: any = req.user;

		if (!user?.userId) {
			return res.status(500).json({ message: 'Need Login' });
		}

		try {
			const access_token = await this.authService.getAccessToken(user);
			const refreshToken = await this.authService.getRefreshToken(user);

			res.cookie('jwt_access_token', access_token, {
				httpOnly: true,
				maxAge: 1000 * 3,
			});

			res.cookie('jwt_refresh_token', refreshToken, {
				httpOnly: true,
				maxAge: 1000 * 60 * 60 * 24,
			});

			return res.status(200).json({ message: 'success' });
		} catch (error) {
			console.log('error: ', error);
			return res.status(500).json({ message: 'Token Broken' });
		}
	}

	@Post('/logout')
	async logout(@Res() res: Response) {
		res.clearCookie('jwt_access_token');
		res.clearCookie('jwt_refresh_token');

		return res.send({
			message: 'success',
		});
	}
}
