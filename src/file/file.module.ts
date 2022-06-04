import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileController } from './controller/file.controller';
import { FileService } from './service/file.service';

@Module({
  controllers: [FileController],
  providers: [PrismaService, FileService]
})
export class FileModule {}
