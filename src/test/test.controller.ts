import { Controller, Get } from '@nestjs/common';

@Controller('test')
export class TestController {
  @Get()
  sayHello(): Object {
    return {
      word: 'hello',
    };
  }
}
