import Mockjs, { Random } from 'mockjs';
import request from '../http';

Mockjs.mock('/mock/basic/info', 'get', {
  code: 0,
  meg: 'success',
  data: {
    date: '20160330',
    records: [
      {
        id: Random.id(),
        title: 'Tsukinomihamashi',
        image: 'http://ainolinks.com/_img/world01.jpg',
      },
      {
        id: Random.id(),
        title: 'Saijojishi',
        image: 'http://ainolinks.com/_img/world03.jpg',
      },
    ],
    ...Mockjs.mock({
      'stories|3': [
        {
          id: '@id',
          date: '@date("yyyyMMdd")',
          'list|10': [
            {
              uid: '@id',
              title: '@ctitle(10, 17)',
              name: '@cname',
              image: 'https://source.unsplash.com/random/200x200?sig=@id',
            },
          ],
        },
      ],
    }),
  },
});

Mockjs.mock('/mock/basic/more', () => {
  return {
    code: 0,
    meg: 'success',
    data: {
      ...Mockjs.mock({
        'stories|1': [
          {
            id: '@id',
            date: '@date("yyyyMMdd")',
            'list|10': [
              {
                uid: '@id',
                title: '@ctitle(10, 17)',
                name: '@cname',
                image: 'https://source.unsplash.com/random/200x200?sig=@id',
              },
            ],
          },
        ],
      }),
    },
  };
});

export const getHomeBasicInfo = () => request.get('/mock/basic/info');

export const getHomeBasicMoreInfo = () => request.get('/mock/basic/more');
