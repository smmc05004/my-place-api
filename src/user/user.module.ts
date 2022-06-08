import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';

@Module({
	controllers: [UserController],
	providers: [PrismaService, UserService],
})
export class UserModule {}
