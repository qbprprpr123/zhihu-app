import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Divider, DotLoading, Swiper, Image } from 'antd-mobile';
import { Link } from 'react-router-dom';
import { formatTime } from '@/assets/utils';
import { getHomeBasicInfo, getHomeBasicMoreInfo } from '@/api/request/home';
import HomeHead from '../components/HomeHeader';
import NewsItem from '@/components/NewsItem';
import SkeletonAgain from '@/components/SkeletonAgain';

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
  const loadMore = useRef();

  // 第一次渲染完毕，向服务器发送数据
  useEffect(() => {
    (async () => {
      try {
        const res = await getHomeBasicInfo();
        const { date, records, stories } = res?.data || {};

        setToday(formatTime(date, '{0}{1}{2}'));
        setBannerData(records);
        // 为什么要执行这一步？
        newsList.push(...stories);
        setNewsList([...newsList]);
      } catch (e) {
        return e;
      }
    })();
  }, []);

  // 第一次渲染完毕：设置监听器，实现触底加载
  useEffect(() => {
    let ob = new IntersectionObserver(async (changes) => {
      const { isIntersecting } = changes[0];
      if (isIntersecting) {
        // 加载更多的按钮出现在视口中，也就是触底了
        try {
          // console.log(getHomeBasicMoreInfo);
          const res = await getHomeBasicMoreInfo();
          const { stories } = res?.data || {};

          newsList.push(stories);

          // console.log('newsList =>', stories, newsList);
          setNewsList([...newsList]);
        } catch (e) {
          return e;
        }
      }
    });
    const loadMoreBox = loadMore.current;
    ob.observe(loadMore.current);

    // 在组建销毁释放的时候：手动销毁监听器
    return () => {
      ob.unobserve(loadMoreBox); // loadMore.current = null
      ob = null;
    };
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
      {newsList.length ? (
        <>
          {newsList.map((item, index) => {
            const { date, list, id } = item;
            return (
              <div className='news-box' key={id}>
                {index ? <Divider contentPosition='left'>{formatTime(date, '{1}月{2}日')}</Divider> : null}
                <div className='list'>
                  {list.map((element) => {
                    const { title, image, name, uid } = element;
                    return <NewsItem title={title} image={image} name={name} uid={uid} key={uid} />;
                  })}
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <SkeletonAgain />
      )}

      {/* 加载更多 */}
      <div
        className='loadmore-box'
        ref={loadMore}
        style={{
          display: newsList.length ? 'block' : 'none',
        }}
      >
        <DotLoading />
        <span>数据加载中</span>
      </div>
    </HomeBox>
  );
};

export default Home;
