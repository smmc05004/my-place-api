import { Injectable } from '@nestjs/common';

// 0 -> 방문 예정, 1 -> 방문지
@Injectable()
export class FoodService {
  getFoodList(): Object {
    return {
      data: [

        {
          name: 'food1',
          address: '주소1',
          category: 1,
          visitDate: '2022-02-02'
        },
        {
          name: 'food2',
          address: '주소2',
          category: 1,
          visitDate: '2022-02-03'
        },
        {
          name: 'food3',
          address: '주소3',
          category: 1,
          visitDate: '2022-02-04'
        },
        {
          name: 'food1',
          address: '주소1',
          category: 1,
          visitDate: '2022-02-02'
        },
        {
          name: 'food2',
          address: '주소2',
          category: 1,
          visitDate: '2022-02-03'
        },
        {
          name: 'food3',
          address: '주소3',
          category: 1,
          visitDate: '2022-02-04'
        },
        {
          name: 'food1',
          address: '주소1',
          category: 1,
          visitDate: '2022-02-02'
        },
        {
          name: 'food2',
          address: '주소2',
          category: 1,
          visitDate: '2022-02-03'
        },
        {
          name: 'food3',
          address: '주소3',
          category: 1,
          visitDate: '2022-02-04'
        },
        {
          name: 'food3',
          address: '주소3',
          category: 1,
          visitDate: '2022-02-04'
        },
      ],
      total: 10
    }
    
  }
}
