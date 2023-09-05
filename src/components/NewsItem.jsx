import styled from 'styled-components';
import { Image } from 'antd-mobile';
import { Link } from 'react-router-dom';

const NewsItemBox = styled.div`
  position: relative;
  padding: 15px 0;
  height: 160px;
  box-sizing: border-box;

  a {
    display: block;
    height: 100%;
    text-decoration: none;
  }

  .adm-image {
    position: absolute;
    right: 0;
    top: 15px;
    width: 130px;
    height: 130px;

    img {
      display: block;
      width: 100%;
      height: 100%;
    }

    .adm-image-tip {
      svg {
        width: 50px;
        height: 50px;
      }
    }
  }

  .content {
    margin-right: 160px;

    .title {
      max-height: 90px;
      line-height: 45px;
      font-size: 32px;
      font-weight: 700;
      color: #000;
      overflow: hidden;
    }

    .author {
      line-height: 24px;
      font-size: 24px;
      color: #999;
    }
  }
`;

const NewsItem = (props) => {
  const { title, image, name, uid } = props;
  return (
    <NewsItemBox>
      <Link to={{ pathname: `/detail/${uid}` }}>
        <div className='content'>
          <h4 className='title'>{title}</h4>
          <p className='author'>{`作者 ${name}`}</p>
        </div>
        <Image src={image} lazy />
      </Link>
    </NewsItemBox>
  );
};

export default NewsItem;
