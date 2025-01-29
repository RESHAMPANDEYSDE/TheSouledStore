const express = require("express");
const app = express();
const PORT = 5500;

/
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Middleware to parse JSON
app.use(express.json());


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
  
  apis: ["./app.js"],
};


const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.get("/", (req, res) => {
  res.send("App.js is running!");
});



app.post("/register", (req, res) => {
  const { full_name, email, password, confirm_password, phone_number } = req.body;

  if (!full_name || !email || !password || !confirm_password) {
    return res.status(400).json({ message: "All fields except phone number are required" });
  }

  if (password !== confirm_password) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  res.status(200).json({ message: "User registered successfully" });
});


app.post("/login", (req, res) => {
  const { email, password } = req.body;

 
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  
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
