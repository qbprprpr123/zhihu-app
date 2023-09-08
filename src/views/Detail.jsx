import styled from 'styled-components';
import { LeftOutline, MessageOutline, LikeOutline, StarOutline, MoreOutline } from 'antd-mobile-icons';
import { Badge } from 'antd-mobile';

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
`;

const Detail = (props) => {
  const { navigate } = props;
  return (
    <DetailBox>
      {/* 新闻內容 */}
      <div className='content'>content</div>
      {/* 底部图标 */}
      <div className='tab-bar'>
        <div className='back' onClick={() => navigate(-1)}>
          <LeftOutline />
        </div>
        <div className='icons'>
          <Badge content='128'>
            <MessageOutline />
          </Badge>
          <Badge content='29'>
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
