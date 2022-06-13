import { Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGard } from '../service/jwt-auth.guard';
import { LocalAuthGard } from '../service/local-auth.guard';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGard)
	@Post('/login')
	async login(@Request() req, @Res({ passthrough: true }) res) {
		const access_token = this.authService.login(req.user);

		res.cookie('Authentication', access_token, {
			domain: 'localhost',
			path: '/',
			httpOnly: true,
		});

		return access_token;
	}

	@UseGuards(JwtAuthGard)
	@Get('/profile')
	async getProfile(@Request() req) {
		return req.user;
	}
}
