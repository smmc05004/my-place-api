import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";

export const multerOptions = {
  fileFilter: (request, file, callback) => {

    if (file.mimetype.match(/\/(jpg|jpeg|png|svg|webp)$/)) {
      // 이미지 형식은 jpg, jpeg, png만 허용합니다.
      callback(null, true);
    } else {
      callback(new Error('지원하지 않는 이미지 형식입니다.'), false);
    }
  },

  storage: diskStorage({
    destination: (request, file, callback) => {
      const uploadPath = 'upload';

      if (!existsSync(uploadPath)) {
        // public 폴더가 존재하지 않을시, 생성합니다.
        mkdirSync(uploadPath);
      }

      callback(null, uploadPath);
    },
    // destination: './attach',

    filename: (request, file, callback) => {
      // console.log('file: ', file.filename)
      // '+ '-' + Date.now()' 이 부분이 없으면 위 콘솔이 undefined를 뱉네.. 왜지?..
      callback(null, file.filename + '-' + Date.now());
    }
  })
}

// export const createImageURL = (file): string => {
//   const serverAddress: string = getProcessEnv('SERVER_ADDRESS');
  
//   // 파일이 저장되는 경로: 서버주소/public 폴더
//   // 위의 조건에 따라 파일의 경로를 생성해줍니다.
//   return `${serverAddress}/public/${file.filename}`;
// }