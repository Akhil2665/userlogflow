const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "usersdata.db");

async function initializeDB() {
  try {
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
      )
    `);
    console.log("Database connected successfully");
    return db;
  } catch (error) {
    console.error("DB Error:", error.message);
    process.exit(1);
  }
}

module.exports = initializeDB;
