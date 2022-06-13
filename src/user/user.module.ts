import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from './service/user.service';

@Module({
	providers: [PrismaService, UserService],
	exports: [UserService],
})
export class UserModule {}
