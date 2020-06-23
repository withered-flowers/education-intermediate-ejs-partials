const pool = require('../config/config.js');

const query = 
`CREATE TABLE "Accounts" (
  id SERIAL PRIMARY KEY,
  account VARCHAR(13) NOT NULL,
  transaction VARCHAR(50) NOT NULL,
  amount REAL NOT NULL,
  btc_address VARCHAR(100) NOT NULL
);`;

pool.query(query, (err, result) => {
  if(err) {
    return console.error(err.stack)
  }
  else {
    console.log("Success add table Accounts");
    // Jangan lupa pool.end() kalau tidak mau menunggu
    pool.end();
  }
});