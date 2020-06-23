const { Pool } = require('pg');

const pool = new Pool({
  host: "localhost",
  database: "hacktiv8",
  user: "postgres",
  password: "postgres"
});

module.exports = pool;