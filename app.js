const express = require("express");
const app = express();
const PORT = 5500;

// Swagger setup
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Middleware to parse JSON
app.use(express.json());

// Swagger definition (API Documentation)
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Registration & Login API",
      version: "1.0.0",
      description: "API to handle user registration and login",
    },
    servers: [
      {
        url: "http://localhost:5500",
      },
    ],
  },
  // Path to the API docs (add path to your endpoints here)
  apis: ["./app.js"],
};

// Initialize Swagger
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Default route
app.get("/", (req, res) => {
  res.send("App.js is running!");
});

// Registration endpoint
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with full name, email, password, and phone number.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *                 description: The full name of the user
 *               email:
 *                 type: string
 *                 description: The email of the user
 *               password:
 *                 type: string
 *                 description: The password for the user
 *               confirm_password:
 *                 type: string
 *                 description: Confirmation password
 *               phone_number:
 *                 type: string
 *                 description: The phone number of the user (optional)
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
app.post("/register", (req, res) => {
  const { full_name, email, password, confirm_password, phone_number } = req.body;

  // Validate input (basic checks)
  if (!full_name || !email || !password || !confirm_password) {
    return res.status(400).json({ message: "All fields except phone number are required" });
  }

  if (password !== confirm_password) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // If everything is valid, you can store the user in the database (mocked here)
  res.status(200).json({ message: "User registered successfully" });
});

// Login route
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login the user
 *     description: Login to the app with email and password
 *     parameters:
 *       - name: email
 *         in: body
 *         description: User's email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *       - name: password
 *         in: body
 *         description: User's password
 *         required: true
 *         schema:
 *           type: string
 *           format: password
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Missing fields
 *       401:
 *         description: Invalid credentials
 */
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Example validation logic (you can replace it with real validation)
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // In a real-world application, you would validate the credentials against a database
  if (email === "johndoe@example.com" && password === "Password123!") {
    return res.status(200).json({ message: "Login successful!" });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
