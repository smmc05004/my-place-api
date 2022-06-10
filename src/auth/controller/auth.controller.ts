import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGard } from '../jwt-auth.gard';
import { LocalAuthGard } from '../local-auth.gard';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
	// constructor(private readonly authService: AuthService) {}

	// @UseGuards(AuthGuard('local'))
	// @Post('auth/login')
	// async login(@Request() req) {
	// 	return req.user;
	// }

	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGard)
	@Post('/login')
	async login(@Request() req) {
		return this.authService.login(req.user);
	}

	@UseGuards(JwtAuthGard)
	@Get('/profile')
	async getProfile(@Request() req) {
		return req.user;
	}
}
