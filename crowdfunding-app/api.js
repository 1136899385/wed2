//Express router for handling API endpoints related to crowdfunding activities
const express = require('express');
const router = express.Router();
const db = require('./crowdfunding_db');

// Endpoint to retrieve all active fundraisers
router.get('/fundraisers', async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [rows] = await connection.execute('SELECT * FROM FUNDRAISER WHERE ACTIVE = 1');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to retrieve details of a single fundraiser by ID
router.get('/fundraisers/:id', async (req, res) => {
  const { id } = req.params; // Extract the fundraiser ID from the URL parameter
  try {
    const connection = await db.getConnection();
    const [rows] = await connection.execute('SELECT * FROM FUNDRAISER WHERE FUNDRAISER_ID = ? AND ACTIVE = 1', [id]);
    if (rows.length > 0) {
      res.json(rows[0]); // Respond with the fundraiser details if found
    } else {
      res.status(404).json({ error: 'Fundraiser not found' }); // Return a 404 error if not found
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to create a new fundraiser
router.post('/fundraisers', async (req, res) => {
  const { organizer, caption, targetFunding, currentFunding, city, active, categoryId } = req.body; // Extract data from the request body
  try {
    const connection = await db.getConnection();
    await connection.execute(
      'INSERT INTO FUNDRAISER (ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [organizer, caption, targetFunding, currentFunding, city, active, categoryId]
    );
    res.status(201).json({ message: 'Fundraiser created successfully' }); // Respond with a success message and a 201 status code
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    connection.release(); // Release the database connection
  }
});

// Endpoint to update an existing fundraiser
router.put('/fundraisers/:id', async (req, res) => {
  const { id } = req.params; // Extract the fundraiser ID from the URL parameter
  const { organizer, caption, targetFunding, currentFunding, city, active, categoryId } = req.body; // Extract data from the request body
  try {
    const connection = await db.getConnection();
    await connection.execute(
      'UPDATE FUNDRAISER SET ORGANIZER = ?, CAPTION = ?, TARGET_FUNDING = ?, CURRENT_FUNDING = ?, CITY = ?, ACTIVE = ?, CATEGORY_ID = ? WHERE FUNDRAISER_ID = ?',
      [organizer, caption, targetFunding, currentFunding, city, active, categoryId, id]
    );
    res.json({ message: 'Fundraiser updated successfully' }); // Respond with a success message
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    connection.release(); // Release the database connection
  }
});

// Endpoint to delete a fundraiser
router.delete('/fundraisers/:id', async (req, res) => {
  const { id } = req.params; // Extract the fundraiser ID from the URL parameter
  try {
    const connection = await db.getConnection();
    await connection.execute('DELETE FROM FUNDRAISER WHERE FUNDRAISER_ID = ?', [id]);
    res.json({ message: 'Fundraiser deleted successfully' }); // Respond with a success message
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    connection.release(); // Release the database connection
  }
});

// Endpoint to retrieve all categories
router.get('/categories', async (req, res) => {
  try {
    const connection = await db.getConnection();
    const [rows] = await connection.execute('SELECT * FROM CATEGORY');
    res.json(rows); // Respond with all category data
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to search fundraisers based on provided parameters
router.get('/search', async (req, res) => {
  const { organizer, categoryId } = req.query; // Extract search parameters from the query string
  let sql = 'SELECT * FROM FUNDRAISER WHERE ACTIVE = 1';
  const params = [];

  if (organizer) {
    sql += ' AND ORGANIZER LIKE ?';
    params.push(`%${organizer}%`);
  }
  if (categoryId) {
    sql += ' AND CATEGORY_ID = ?';
    params.push(categoryId);
  }

  try {
    const connection = await db.getConnection();
    const [rows] = await connection.execute(sql, params);
    res.json(rows); // Respond with the search results
  } catch (err) {
    console.error(`Error during search: ${err.message}`);
    res.status(500).json({ error: 'Failed to fetch search results' });
  }
});

module.exports = router;