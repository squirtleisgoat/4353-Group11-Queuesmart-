// ---- IMPORT DEPENDENCIES ----
const express = require("express");
const app = express();

// ---- IMPORT AUTH FUNCTIONS ----
const { registerUser, loginUser } = require("./auth");

// ---- MIDDLEWARE ----
// this tells express to read JSON data sent from the frontend
app.use(express.json());

// this allows your frontend to talk to your backend
// (browsers block this by default, this fixes it)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});


// ---- REGISTER ENDPOINT ----
// frontend calls this when someone clicks Register
app.post("/register", (req, res) => {

  // grab the data sent from the frontend
  const { email, password, role } = req.body;

  // run the register function from auth.js
  const result = registerUser(email, password, role);

  // if it failed send back a 400 error with the message
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }

  // if it worked send back a 201 success with the user
  return res.status(201).json({ message: result.message, user: result.user });
});


// ---- LOGIN ENDPOINT ----
// frontend calls this when someone clicks Login
app.post("/login", (req, res) => {

  // grab the data sent from the frontend
  const { email, password } = req.body;

  // run the login function from auth.js
  const result = loginUser(email, password);

  // if it failed send back a 400 error with the message
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }

  // if it worked send back a 200 success with the user
  return res.status(200).json({ message: result.message, user: result.user });
});


// ---- START THE SERVER ----
const PORT = 3000;
app.listen(PORT, () => {
  console.log("QueueSmart backend is running on http://localhost:3000");
});


// ---- EXPORT APP ----
// needed for testing
module.exports = app;