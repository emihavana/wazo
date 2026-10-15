import {DatabaseSync} from "node:sqlite";
const db = new DatabaseSync(':memory:');


db.exec(`
CREATE TABLE  users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
)`);

db.exec(`
  CREATE TABLE Todos(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  Task TEXT NOT NULL,
  completed BOOLEAN  DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id))`);
  export default db;