import {  Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import {  FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../multerOptions';

@Controller('file')
export class FileController {

  @Post('upload')
  // @UseInterceptors(FilesInterceptor('files', 10, multerOptions))
  // uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
  @UseInterceptors(FileInterceptor('file', multerOptions))
  uploadFiles(@UploadedFile() file: Express.Multer.File) {
    console.log('file: ', file)

    return {
      filename: file.filename
    };
  }

}
