package database

const queryCreate = `
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    name TEXT,
    lastname TEXT
  );
`
