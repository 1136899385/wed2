// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Sapp from './Sapp'; // 导入 Sapp 组件

console.log("React is loading..."); 

ReactDOM.render(
  <React.StrictMode>
    <Sapp />
  </React.StrictMode>,
  document.getElementById('root')
);