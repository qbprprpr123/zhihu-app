import { Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Mask, DotLoading } from 'antd-mobile';
import routes from './routes';

// 统一路由配置
const Element = (props) => {
  const { component: Component, meta } = props;

  // 修改页面title
  const { title = '知乎日报' } = meta || {};
  document.title = title;

  // 获取路由信息传递给组件
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  return <Component params={params} navigate={navigate} location={location} searchParams={searchParams} />;
};

export default function RouterView() {
  return (
    <Suspense
      fallback={
        <Mask visible>
          <DotLoading color='white' />
        </Mask>
      }
    >
      <Routes>
        {routes.map((item) => {
          const { name, path } = item;
          return <Route key={name} path={path} element={<Element {...item} />} />;
        })}
      </Routes>
    </Suspense>
  );
}
