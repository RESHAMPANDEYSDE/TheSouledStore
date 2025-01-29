# TheSouledStore
Souled Store - API Project

The Souled Store is an API-driven project designed to handle user registration, login, and product management for an e-commerce platform. It uses Express.js as the backend framework, with a basic setup for user registration, login, and CRUD operations on products. The project also includes API documentation generated with Swagger for easy testing and understanding.

Technologies Used:
Node.js with Express.js for building the backend API.
Swagger for API documentation and testing.
MySQL as the relational database to store user and product data.
JWT (JSON Web Tokens) for future authentication features .

Database:
MySQL is used to store the following entities:
Users: Information like full name, email, password , phone number, etc.
Products: Information such as product name, description, price, category, etc.
Project Structure:
app.js: The main server file that contains all routes, including registration, login, and product management.
models/: Contains files for interacting with the MySQL database (e.g., user and product models).
swagger/: Contains the Swagger documentation for easy testing of the API endpoints.
//Tested Data Examples:
1. User Registration (POST /register):
2.  "full_name": "Jane Doe",
  "email": "jane.doe@example.com",
  "password": "Password123!",
  "confirm_password": "Password123!",
  "phone_number": "9876543210"
Response: "message": "User registered successfully"
2. Login (POST /login):
"email": "jane.doe@example.com",
"password": "Password123!"
Response: "Login successful!"
3. Get User Details (GET /user/{email}):
URL: GET /user/jane.doe@example.com
Response:
   full_name": "Jane Doe",
  "email": "jane.doe@example.com",
  "phone_number": "9876543210"

//for running server node app.js 
//http://localhost:5500/api-docs in  browser to view and test the API.
