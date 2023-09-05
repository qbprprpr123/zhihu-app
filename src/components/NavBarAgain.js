import { NavBar } from 'antd-mobile';

const NavBarAgain = (props) => {
  const { title = '个人中心' } = props;
  const handleBack = () => {};
  return <NavBar onBack={handleBack}>{title}</NavBar>;
};

export default NavBarAgain;
