import {
	CanActivate,
	ExecutionContext,
	HttpException,
	// HttpStatus,
	// UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export class AuthGuard implements CanActivate {
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest();
		const user = request['user'];

		if (!user) {
			throw new HttpException('There is no token', 401);
			// throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
		}
		return true;
	}
}
