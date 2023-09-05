import { useMemo } from 'react';
import styled from 'styled-components';
import AisaImage from '@/assets/images/aisa.jpg';

const HomeHeadBox = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  box-sizing: border-box;

  .picture {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }

  .info {
    display: flex;
    align-items: center;

    .title {
      padding-left: 24px;
      height: 64px;
      line-height: 64px;
      font-size: 40px;
      border-left: 2px solid #eee;
    }

    .time {
      height: 70px;
      padding-right: 30px;

      span {
        display: block;
        text-align: center;
        line-height: 35px;

        &:nth-child(1) {
          font-size: 32px;
        }
      }
    }
  }
`;

const HomeHead = (props) => {
  // 计算时间中的月和日
  const { today } = props;
  const time = useMemo(() => {
    const [, month, day] = today.match(/^\d{4}(\d{2})(\d{2})$/);
    const area = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
    return {
      day,
      month: `${area[+month]}月`,
    };
  }, [today]);
  return (
    <HomeHeadBox>
      <div className='info'>
        <div className='time'>
          <span>{time.day}</span>
          <span>{time.month}</span>
        </div>
        <h2 className='title'>知乎日报</h2>
      </div>
      <div className='picture'>
        {/*
        在jsx中，想直接获取资源图片，不能设置相对地址
        进过webpack打包处理后，项目的结果目录已发生改变
        但如果在css样式中，我们使用图片可以使用相对路径，
        因为webpack打包的时候，会处理css中的图片导入：
          1、把需要的图片进行打包
          2、把打包后的地址重新覆盖css中写的地址
        在视图中使用图片，我们该如何处理？
          1、基于ES6Module模块方式导入图片
       */}
        <img src={AisaImage} alt='Aisa' />
      </div>
    </HomeHeadBox>
  );
};

export default HomeHead;
