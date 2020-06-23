const pool = require('../config/config.js');
const fs = require('fs');

fs.readFile('./data/dummy.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err.stack);
  }
  else {
    data = JSON.parse(data);

    // Karena kita akan membentuk querynya untuk menjadi single query
    // yang besar, maka kita membutuhkan jumlah data yang ada
    const maxLen = data.length;

    // Ini adalah query dasar untuk memasukkan data ke dalam tabel
    // Accounts, masih belum ada valuenya
    let textQuery =
      `INSERT INTO "Accounts" 
        (account, transaction, amount, btc_address) 
      VALUES `;

    // Ini nanti adalah valuenya
    let arrValues = [];

    // Di sini kita akan membuat query stringnya
    for(let ctr = 0; ctr < maxLen; ctr++) {

      // Kita akan memasukkan queryString nya supaya
      // menjadi sebuah kesatuan yang besar
      // e.g: 
      // ($1, $2, $3, $4), ($5, $6, $7, $8), (...)
      textQuery += 
        `($${4*ctr +1}, $${4*ctr +2}, $${4*ctr +3}, $${4*ctr +4})`;
      ctr !== maxLen-1 ? textQuery += ', ' : textQuery += ';';

      // Di sini kita akan melakukan "flattening"
      // Karena dari bentuk array of object,
      // kita harus konversi jadi array 1 dimensi saja
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
        // Kita lihat hasil data setelah berhasil dimasukkan seperti apa
        console.log(result);

        // Konfirmasi saja apabila berhasil
        console.log("All data In !");
        
        // Jangan lupa di-end kalau tidak ingin menunggu
        pool.end();
      }
    });
  }
});