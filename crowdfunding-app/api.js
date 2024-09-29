// api.js
const express = require('express');
const router = express.Router();
const db = require('./crowdfunding_db');

// 获取所有活跃的筹款活动
router.get('/fundraisers', async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [rows] = await connection.execute('SELECT * FROM FUNDRAISER WHERE ACTIVE = 1');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 获取单个筹款活动的详细信息
router.get('/fundraisers/:id', async (req, res) => {
  const { id } = req.params; // 从路由参数获取筹款活动ID
  try {
    const connection = await db.getConnection();
    const [rows] = await connection.execute('SELECT * FROM FUNDRAISER WHERE FUNDRAISER_ID = ? AND ACTIVE = 1', [id]);
    if (rows.length > 0) {
      res.json(rows[0]); // 如果找到，响应筹款活动详情
    } else {
      res.status(404).json({ error: 'Fundraiser not found' }); // 如果未找到，返回404错误
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 创建新的筹款活动
router.post('/fundraisers', async (req, res) => {
  const { organizer, caption, targetFunding, currentFunding, city, active, categoryId } = req.body; // 从请求体获取数据
  try {
    const connection = await db.getConnection();
    await connection.execute('INSERT INTO FUNDRAISER (ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID) VALUES (?, ?, ?, ?, ?, ?, ?)', [organizer, caption, targetFunding, currentFunding, city, active, categoryId]);
    res.status(201).json({ message: 'Fundraiser created successfully' }); // 创建成功后返回201状态码
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    connection.release(); // 释放数据库连接
  }
});

// 更新筹款活动
router.put('/fundraisers/:id', async (req, res) => {
  const { id } = req.params; // 从路由参数获取筹款活动ID
  const { organizer, caption, targetFunding, currentFunding, city, active, categoryId } = req.body; // 从请求体获取数据
  try {
    const connection = await db.getConnection();
    await connection.execute('UPDATE FUNDRAISER SET ORGANIZER = ?, CAPTION = ?, TARGET_FUNDING = ?, CURRENT_FUNDING = ?, CITY = ?, ACTIVE = ?, CATEGORY_ID = ? WHERE FUNDRAISER_ID = ?', [organizer, caption, targetFunding, currentFunding, city, active, categoryId, id]);
    res.json({ message: 'Fundraiser updated successfully' }); // 更新成功后返回响应
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    connection.release(); // 释放数据库连接
  }
});

// 删除筹款活动
router.delete('/fundraisers/:id', async (req, res) => {
  const { id } = req.params; // 从路由参数获取筹款活动ID
  try {
    const connection = await db.getConnection();
    await connection.execute('DELETE FROM FUNDRAISER WHERE FUNDRAISER_ID = ?', [id]);
    res.json({ message: 'Fundraiser deleted successfully' }); // 删除成功后返回响应
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    connection.release(); // 释放数据库连接
  }
});

// 获取所有类别
router.get('/categories', async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [rows] = await connection.execute('SELECT * FROM CATEGORY');
    res.json(rows); // 响应所有类别的数据
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 搜索筹款活动
router.get('/search', async (req, res) => {
  const { organizer, city, categoryId } = req.query; // 从查询参数获取搜索条件
  let sql = 'SELECT * FROM FUNDRAISER WHERE ACTIVE = 1';
  const params = [];

  if (organizer) {
    sql += ' AND ORGANIZER = ?';
    params.push(organizer);
  }
  if (city) {
    sql += ' AND CITY = ?';
    params.push(city);
  }
  if (categoryId) {
    sql += ' AND CATEGORY_ID = ?';
    params.push(categoryId);
  }

  try {
    const connection = await db.getConnection();
    const [rows] = await connection.execute(sql, params);
    res.json(rows); // 响应搜索结果
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 处理捐赠
router.post('/fundraisers/:id/donate', async (req, res) => {
  const { id } = req.params; // 从路由参数获取筹款活动ID
  const { amount } = req.body; // 从请求体获取捐赠金额
  try {
    const connection = await db.getConnection();
    await connection.execute('UPDATE FUNDRAISER SET CURRENT_FUNDING = CURRENT_FUNDING + ? WHERE FUNDRAISER_ID = ?', [amount, id]);
    res.json({ message: 'Donation processed successfully' }); // 捐赠成功后返回响应
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    connection.release(); // 释放数据库连接
  }
});

module.exports = router;