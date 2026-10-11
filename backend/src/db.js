import {Databasesync} from "node:sqlite3";
const db = new DatabaseSync(':memory:');


db.exec(`
CREATE TABLE  users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
`);