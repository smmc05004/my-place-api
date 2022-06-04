import {  Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import {  FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../multerOptions';

const fileFilter = (req, file, callback) => {
  console.log('file: ', file)
  console.log('callback: ', callback)
  console.log('mimetype: ', file.mimetype)
}

@Controller('file')
export class FileController {

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 10, multerOptions))
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log('files: ', files)

    return {
      // file: file.buffer.toString(),
      file: 'aaaa'
    };
  }

  // @Post()
  // async uploadFile() {
  //   await this.fileService.
  // }
}
