import sqlite3 from "sqlite3";

const dbPath = process.env.DB_PATH || "/app/db/product-catalog.db";
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('Database connection error:', err);
    else console.log(`Connected to SQLite database at ${dbPath}`);
});

db.serialize(() => {
    // Drop the old variants table if it exists (to ensure a clean slate)
    db.run(`DROP TABLE IF EXISTS variants`);

    db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      discount REAL DEFAULT 0,
      category TEXT NOT NULL
    )
  `);
    db.run(`
    CREATE TABLE IF NOT EXISTS variants (
      id TEXT,
      productId INTEGER,
      size TEXT,
      color TEXT,
      stock INTEGER NOT NULL,
      FOREIGN KEY (productId) REFERENCES products(id),
      UNIQUE (productId, id)
    )
  `);
    db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      name TEXT PRIMARY KEY
    )
  `);
});

export default db;