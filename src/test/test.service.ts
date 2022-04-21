import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  sayHello(): Object {
    return {
      word: 'hello',
    };
  }
}
