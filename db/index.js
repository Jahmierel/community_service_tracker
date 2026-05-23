// ============================================================
// db/index.js
// This file sets up the connection to the PostgreSQL database.
// ============================================================
//
// ✏️  TASK (COMMENT): Add a comment above EACH of the 5 marked sections below
//     explaining what that line or block of code does.
//     Your comments should be in your own words.
//     You will NOT change any of the actual code — only add comments.
//
// ============================================================

// SECTION 1 — add your comment here:
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// SECTION 2 — add your comment here:
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// SECTION 3 — add your comment here:
const schemaPath = path.join(__dirname, "schema.sql");
const schema = fs.readFileSync(schemaPath, "utf8");

// SECTION 4 — add your comment here:
(async () => {
  try {
    await pool.query(schema);
    console.log("✅ Tables ensured from schema.sql");
  } catch (err) {
    console.error("❌ Failed to run schema.sql:", err);
  }
})();

// SECTION 5 — add your comment here:
module.exports = pool;
