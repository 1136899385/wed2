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

module.exports = router;