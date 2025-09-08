const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();

let db; // injected from server.js

// Middleware to check session
const authenticateSession = (request, response, next) => {
  if (request.session && request.session.username) {
    next();
  } else {
    response.status(401).send("Unauthorized: No active session");
  }
};

// Register
router.post("/register", async (request, response) => {
  const { username, password } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const selectUserQuery = `SELECT * FROM users WHERE username = ?`;
  const dbUser = await db.get(selectUserQuery, [username]);

  if (dbUser) {
    return response.status(400).send("User already exists");
  }

  const createUserQuery = `
        INSERT INTO users (username, password)
        VALUES (?, ?)`;
  await db.run(createUserQuery, [username, hashedPassword]);

  response.send("User created successfully");
});

// Login (with session)
router.post("/login", async (request, response) => {
  const { username, password } = request.body;
  const selectUserQuery = `SELECT * FROM users WHERE username = ?`;
  const dbUser = await db.get(selectUserQuery, [username]);
  console.log(dbUser, "dbUser");

  if (!dbUser) {
    return response.status(400).send("Invalid user");
  }

  const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
  if (!isPasswordMatched) {
    return response.status(400).send("Invalid password");
  }

  // Store session
  request.session.username = username;
  console.log(request.sessionID, "sessionID");
  console.log(dbUser.username, "dbUser.username");
  response.send(dbUser.username);
});

// Logout
router.post("/logout", authenticateSession, (request, response) => {
  request.session.destroy((err) => {
    if (err) {
      return response.status(500).send("Error logging out");
    }
    response.clearCookie("connect.sid"); // default cookie name
    response.send("Logged out successfully");
  });
});

// Inject DB instance
function injectDB(database) {
  db = database;
}

module.exports = { router, injectDB };
