const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

// Create Express app
const app = express();
const port = 5500;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root', 
  database: 'souled_store' 
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to the MySQL database!');
});

// Register a new user
app.post('/register', (req, res) => {
  const { full_name, email, password, phone_number } = req.body;

  // Validate input
  if (!full_name || !email || !password) {
    return res.status(400).json({ message: 'All fields except phone number are required.' });
  }

  
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: 'Error hashing password.' });

    const query = 'INSERT INTO users (full_name, email, password, phone_number) VALUES (?, ?, ?, ?)';
    db.query(query, [full_name, email, hashedPassword, phone_number], (err, result) => {
      if (err) return res.status(500).json({ message: 'Error registering user.' });
      res.status(201).json({ message: 'User registered successfully.' });
    });
  });
});

// Login a user
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, result) => {
    if (err || result.length === 0) return res.status(400).json({ message: 'Invalid email or password.' });

    const user = result[0];

   
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) return res.status(400).json({ message: 'Invalid email or password.' });

      // Generate JWT token for authentication
      const token = jwt.sign({ userId: user.id }, 'your_jwt_secret_key', { expiresIn: '1h' });

      res.json({
        message: 'Login successful.',
        token: token,
        user: {
          full_name: user.full_name,
          email: user.email
        }
      });
    });
  });
});

app.post('/add-product', (req, res) => {
  const { name, description, price, image_url, category } = req.body;

  // Validate input
  if (!name || !price || !category) {
    return res.status(400).json({ message: 'Name, price, and category are required.' });
  }

  const query = 'INSERT INTO products (name, description, price, image_url, category) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, description, price, image_url, category], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error adding product.' });
    res.status(201).json({ message: 'Product added successfully.' });
  });
});

// Fetch all products
app.get('/products', (req, res) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error fetching products.' });
    res.json({ products: result });
  });
});

// Fetch products by category
app.get('/products/category/:category', (req, res) => {
  const { category } = req.params;
  const query = 'SELECT * FROM products WHERE category = ?';
  db.query(query, [category], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error fetching products by category.' });
    res.json({ products: result });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port 5500{port}`);
});
