import React from 'react';
import ReactDOM from 'react-dom/client';
// 改变rem换算比例
import 'lib-flexible';
// antd-mobile按需加载样式
import 'antd-mobile/es/global';
import { ConfigProvider } from 'antd-mobile';
import zhCN from 'antd-mobile/es/locales/zh-CN';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>,
);
