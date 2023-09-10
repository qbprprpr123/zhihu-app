import Mockjs, { Random } from 'mockjs';
import request from '../http';

// 获取基本信息
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

Mockjs.mock('/mock/story_extra', () => {
  return {
    code: 0,
    meg: 'success',
    data: {
      long_comments: 1,
      popularity: 183,
      short_comments: 22,
      comments: 23,
    },
  };
});

// 获取基本信息
export const getHomeBasicInfo = () => request.get('/mock/basic/info');

// 获取每天的新闻信息
export const getHomeBasicMoreInfo = () => request.get('/mock/basic/more');

// 获取详情页信息
export const getInfoDetail = () => request.get('/api/news/3930883');

// 获取新闻点赞信息
export const getStoryExtraInfo = () => request.get('/mock/story_extra');
