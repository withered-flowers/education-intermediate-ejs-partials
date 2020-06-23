const pool = require('../config/config.js');
const fs = require('fs');

fs.readFile('./data/dummy.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err.stack);
  }
  else {
    data = JSON.parse(data);

    const maxLen = data.length;
    let textQuery =
      `INSERT INTO "Accounts" 
        (account, transaction, amount, btc_address) 
      VALUES `;

    let arrValues = [];

    // Create Query String
    for(let ctr = 0; ctr < maxLen; ctr++) {

      // Query String Maker
      textQuery += 
        `($${4*ctr +1}, $${4*ctr +2}, $${4*ctr +3}, $${4*ctr +4})`;
      ctr !== maxLen-1 ? textQuery += ', ' : textQuery += ';';

      // Query Values Maker
      arrValues.push(
        data[ctr].account,
        data[ctr].transaction,
        data[ctr].amount,
        data[ctr].btc_address
      );
    }

    // Single query
    pool.query(textQuery, arrValues, (err, result) => {
      if(err) {
        console.error(err.stack);
      }
      else {
        console.log("All data In !");
        console.log(result);
        pool.end();
      }
    });
  }
});
