const pool = require('../config/config.js');

const query = 
`CREATE TABLE "Accounts" (
  id SERIAL PRIMARY KEY,
  account VARCHAR(13) NOT NULL,
  transaction VARCHAR(50) NOT NULL,
  amount REAL NOT NULL,
  btc_address VARCHAR(100) NOT NULL
);`;

pool.connect((err, client, release) => {
  client.query(query, [], (err2, res) => {
    release();

    if(err2) {
      return console.error(err2.stack);
    }
    else {
      console.log("Success add Table Accounts");
      pool.end();
    }
  })
});