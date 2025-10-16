import mysql from 'mysql2';
import dotenv from 'dotenv';
import mysqlPromise from 'mysql2/promise';

// Regular connection (for controllers already using callbacks)
export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'smokestack',
  port: 8889,
});

// Promise connection (for use with async/await)
export const dbPromise = mysqlPromise.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'smokestack',
  port: 8889,
});