import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { LeftOutline, MessageOutline, LikeOutline, StarOutline, MoreOutline } from 'antd-mobile-icons';
import { Badge } from 'antd-mobile';
import SkeletonAgain from '@/components/SkeletonAgain';
import { getInfoDetail, getStoryExtraInfo } from '@/api/request/home';

const DetailBox = styled.div`
  .tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 90px;
    align-items: center;
    display: flex;
    z-index: 999;
    box-sizing: border-box;
    background: #ddd;

    .back {
      box-sizing: border-box;
      width: 100px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 40px;
      font-weight: 900;
      border-right: 2px solid #ccc;
    }

    .icons {
      display: flex;
      flex: 1;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      line-height: 50px;
      text-align: center;

      .adm-badge-wrapper,
      span {
        flex-grow: 1;
        text-align: center;
        font-size: 40px;
      }

      span {
        &:nth-last-of-type(1) {
          color: #aaa;
        }

        &:nth-of-type(1) {
          &.stored {
            color: #108ee9;
          }
        }
      }

      .adm-badge-wrapper {
        .adm-badge-fixed {
          top: 10%;
          right: 28%;
        }

        .adm-badge {
          background: none;

          .adm-badge-content {
            color: #555;
          }
        }
      }
    }
  }

  .content {
    .headline {
      .img-place-holder {
        height: inherit;
      }

      img {
        margin: 0;
      }
    }
    .view-more {
      padding-bottom: 90px;
    }
  }
`;

let link = null;

const Detail = (props) => {
  const { navigate } = props;

  const [info, setInfo] = useState(null);
  const [extra, setExtra] = useState(null);

  // 第一次渲染完毕：获取数据
  const handleStyle = () => {
    if (!info) return;
    const css = info?.css?.[0] || '';
    link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = css;
    document.head.appendChild(link);
  };
  const handleImage = () => {
    const imgPlaceHolder = document.querySelector('.img-place-holder');
    if (!imgPlaceHolder) return;
    // 创建大图并插入到容器
    const tempImg = new Image();
    tempImg.src = info.image;
    tempImg.onload = () => imgPlaceHolder.appendChild(tempImg);
    tempImg.onerror = () => {
      const parent = imgPlaceHolder.parentNode;
      parent.parentNode.removeChild(parent);
    };
  };

  // 初始化数据
  useEffect(() => {
    try {
      const getInfoDetailFn = async () => {
        const res = await getInfoDetail();
        setInfo(res);
      };

      getInfoDetailFn();
    } catch (e) {
      return e;
    }

    return () => {
      if (link) document.head.removeChild(link);
      link = null;
    };
  }, []);
  useEffect(() => {
    try {
      const getStoryExtraInfoFn = async () => {
        const res = await getStoryExtraInfo();
        setExtra(res?.data);
      };

      getStoryExtraInfoFn();
    } catch (e) {
      return e;
    }
  }, []);

  // 处理样式 & 图片
  useEffect(() => {
    handleStyle();
    handleImage();
  }, [info]);

  return (
    <DetailBox>
      {/* 新闻內容 */}
      {!info ? <SkeletonAgain /> : <div className='content' dangerouslySetInnerHTML={{ __html: info.body }} />}
      {/* 底部图标 */}
      <div className='tab-bar'>
        <div className='back' onClick={() => navigate(-1)}>
          <LeftOutline />
        </div>
        <div className='icons'>
          <Badge content={extra?.long_comments || 0}>
            <MessageOutline />
          </Badge>
          <Badge content={extra?.popularity || 0}>
            <LikeOutline />
          </Badge>
          <span className='stored'>
            <StarOutline />
          </span>
          <span>
            <MoreOutline />
          </span>
        </div>
      </div>
    </DetailBox>
  );
};

export default Detail;
