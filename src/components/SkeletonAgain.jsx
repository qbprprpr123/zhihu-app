import { Skeleton } from 'antd-mobile';
import styled from 'styled-components';

const SkeletonAgainBox = styled.div`
  padding: 20px 30px;

  .adm-skeleton-title {
    margin: 30px 0;
    height: 50px;
  }

  .adm-skeleton-paragraph-line {
    margin: 20px 0;
    height: 32px;
  }
`;
const SkeletonAgain = () => {
  return (
    <SkeletonAgainBox>
      <Skeleton.Title animated />
      <Skeleton.Paragraph lineCount={5} animated />
    </SkeletonAgainBox>
  );
};

export default SkeletonAgain;
