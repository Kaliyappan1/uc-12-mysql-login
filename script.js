const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt'); // For password hashing

require('dotenv').config(); // Load environment variables

const app = express();
const port = 3000;

const pool = mysql.createPool({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_name,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Routes

app.get('/signup', async (req, res) => {
  const { fname, lname, gender, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password

    const [results] = await pool.query('INSERT INTO users (fname, lname, gender, email, password) VALUES (?, ?, ?, ?, ?)', [fname, lname, gender, email, hashedPassword]);

    res.json({ message: 'Signup successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while signing up' });
  }
});

app.get('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0]; // Assuming unique email

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
});

// ... other routes

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
