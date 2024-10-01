// app.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const api = require('./api');

// 允许跨域请求
app.use(cors());

// 用于解析 JSON 请求体的中间件
app.use(express.json());

// 注册 API 路由
app.use('/api', api);

// 测试 API 路由
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// 处理根路径的路由
app.get('/', (req, res) => {
  res.send('Welcome to the Crowdfunding Platform');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// app.js

//添加一个错误处理中间件：
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});