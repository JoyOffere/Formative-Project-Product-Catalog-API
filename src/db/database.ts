import sqlite3 from "sqlite3";

const db = new sqlite3.Database(':memory:', (err) => {
    if (err) console.error('Database connection error:', err);
    else console.log('Connected to SQLite in-memory database');
});

// Initialize tables
db.serialize(() => {
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
      id TEXT PRIMARY KEY,
      productId INTEGER,
      size TEXT,
      color TEXT,
      stock INTEGER NOT NULL,
      FOREIGN KEY (productId) REFERENCES products(id)
    )
  `);
    db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      name TEXT PRIMARY KEY
    )
  `);
});

export default db;