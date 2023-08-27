import React from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import App from './App';
import 'lib-flexible';
import './assets/reset.min.css';

const StyleProvider = styled.div`
  .box {
    width: 328px;
    height: 164px;
    line-height: 164px;
    background-color: aqua;
  }
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StyleProvider>
    <div className='box'>
      <App />
    </div>
  </StyleProvider>,
);
