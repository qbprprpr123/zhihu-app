import { lazy } from 'react';
import Home from '@/views/Home';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: '知乎日报' },
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: lazy(() => import('../views/Detail')),
    meta: { title: '新闻详情' },
  },
  {
    path: '/personal',
    name: 'Personal',
    component: lazy(() => import('../views/Personal')),
    meta: { title: '个人中心' },
  },
  {
    path: '/store',
    name: 'Store',
    component: lazy(() => import('../views/Store')),
    meta: { title: '我的收藏' },
  },
  {
    path: '/update',
    name: 'Update',
    component: lazy(() => import('../views/Update')),
    meta: { title: '修改个人信息' },
  },
  {
    path: '/login',
    name: 'Login',
    component: lazy(() => import('../views/Login')),
    meta: { title: '登录/注册' },
  },
  {
    path: '*',
    name: '404',
    component: lazy(() => import('../views/Page404')),
    meta: { title: '404页面' },
  },
];

export default routes;
