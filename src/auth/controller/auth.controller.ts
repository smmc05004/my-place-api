import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGard } from '../service/jwt-auth.guard';
import { LocalAuthGard } from '../service/local-auth.guard';
import { AuthService } from '../service/auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGard)
	@Post('/login')
	async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		// console.log('user: ', );
		const user = req.user;
		const { access_token } = await this.authService.login(user);

		res.setHeader('Authorization', `Bearer ${access_token}; path=/;`);

		res.cookie('jwt', access_token, {
			httpOnly: true,
			// domain: 'http://localhost:3000/auth/login',
			// maxAge: 5 * 60 * 1000,
		});
		console.log('res: ', res);

		// access_token
		return { data: user };
	}

	@UseGuards(JwtAuthGard)
	@Get('/profile')
	async getProfile(@Req() req: Request) {
		return req.user;
	}

	@Get('/cookies')
	getCookies(@Req() req: Request, @Res() res: Response) {
		const jwt = req.cookies['jwt'];
		return res.send(jwt);
	}

	@Post('/logout')
	async logout(@Res() res) {
		res.cookie('Authentication', '', {
			maxAge: 0,
		});

		return res.send({
			message: 'success',
		});
	}
}
