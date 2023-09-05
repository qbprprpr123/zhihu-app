import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Divider, DotLoading, Swiper, Image } from 'antd-mobile';
import { Link } from 'react-router-dom';
import { formatTime } from '@/assets/utils';
import { getHomeBasicInfo } from '@/api/request/home';
import HomeHead from '../components/HomeHeader';
import NewsItem from '@/components/NewsItem';
// import SkeletonAgain from '@/components/SkeletonAgain';

const HomeBox = styled.div`
  /* 轮播图 */
  .swiper-box {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    background: #ddd;

    .swiper-box-banner {
      width: 100%;
      height: 0;
      padding-top: 56.25%;
    }

    .adm-swiper {
      position: absolute;
      top: 0;
      height: 100%;

      a {
        display: block;
        height: 100%;

        .adm-image,
        img {
          display: block;
          width: 100%;
          height: 100%;

          .adm-image-tip {
            svg {
              width: 20%;
              height: 20%;
            }
          }
        }

        .desc {
          position: absolute;
          left: 10px;
          width: 100%;
          bottom: 5px;
          box-sizing: border-box;

          .title {
            font-size: 60px;
            color: #fff;
            font-weight: 100;
          }
        }
      }

      .adm-swiper-indicator {
        bottom: 20px;
        left: auto;
        right: 0;
        transform: translateX(-30px);
      }

      .adm-page-indicator-dot {
        margin: 0 6px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);

        &.adm-page-indicator-dot-active {
          width: 36px;
          border-radius: 6px;
          background-color: #fff;
        }
      }
    }
  }

  /* 新闻列表 */
  .news-box {
    padding: 10px 30px;

    .adm-divider-left {
      &.adm-divider-horizontal {
        &:before {
          max-width: 2%;
        }
      }
    }
  }

  /* 加载更多 */
  .loadmore-box {
    height: 80px;
    color: #999;
    line-height: 80px;
    text-align: center;
    font-size: 24px;
    background: #eee;

    .adm-dot-loading {
      position: static;
      transform: none;
      font-size: 32px;
    }
  }
`;

const Home = () => {
  // 创建所需状态
  const [today, setToday] = useState(formatTime(null, '{0}{1}{2}'));
  const [bannerData, setBannerData] = useState([]);
  const [newsList, setNewsList] = useState([]); // 0x000

  // 第一次渲染完毕，向服务器发送数据
  useEffect(() => {
    (async () => {
      try {
        const res = await getHomeBasicInfo();
        const { date, records, stories } = res?.data;
        console.log(stories);
        setToday(formatTime(date, '{0}{1}{2}'));
        setBannerData(records);
        setNewsList([...stories]);
      } catch (e) {
        return e;
      }
    })();
  }, []);

  return (
    <HomeBox>
      {/* 头部 */}
      <HomeHead today={today} />
      {/* 轮播图 */}
      <div className='swiper-box'>
        <div className='swiper-box-banner'>
          {bannerData.length > 0 ? (
            <Swiper autoplay loop>
              {bannerData.map((item) => {
                const { id, image, title } = item;
                return (
                  <Swiper.Item key={id}>
                    <Link to={{ pathname: `/detail/${id}` }}>
                      <Image lazy src={image} />
                      <div className='desc'>
                        <h3 className='title'>{title}</h3>
                      </div>
                    </Link>
                  </Swiper.Item>
                );
              })}
            </Swiper>
          ) : null}
        </div>
      </div>
      {/* 新闻列表 */}
      {/* <SkeletonAgain /> */}
      <div className='news-box'>
        {newsList.map((item) => {
          const { date, list, id } = item;
          return (
            <div key={id}>
              <Divider contentPosition='left'>{formatTime(date, '{1}月{2}日')}</Divider>
              <div className='list'>
                {list.map((element) => {
                  const { title, image, name, uid } = element;
                  return <NewsItem title={title} image={image} name={name} uid={uid} key={uid} />;
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* 加载更多 */}
      <div className='loadmore-box'>
        <DotLoading />
        <span>数据加载中</span>
      </div>
    </HomeBox>
  );
};

export default Home;
