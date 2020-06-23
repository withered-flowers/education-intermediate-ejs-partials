const pool = require('../config/config.js');

class Account {
  constructor(id, account, transaction, amount, btc_address) {
    this.id = id;
    this.account = account;
    this.transaction = transaction;
    this.amount = amount;
    this.btc_address = btc_address;
  }

  static findAll(callback) {
    let textQuery =
      `SELECT id, account, transaction, amount, btc_address
       FROM "Accounts"`;

    pool.query(textQuery, (err, result) => {
      if (err) {
        callback(err, null);
      }
      else {
        let data = result.rows;

        data = data.map(elem => {
          return new Account(
            elem.id,
            elem.account,
            elem.transaction,
            elem.amount,
            elem.btc_address
          );
        });

        callback(null, data);
      }
    });
  }

  static findOne(id, callback) {
    let textQuery =
      `SELECT id, account, transaction, amount, btc_address
       FROM "Accounts" 
       WHERE id=$1`;

    let arrValues = [id];

    pool.query(textQuery, arrValues, (err, result) => {
      if (err) {
        callback(err, null);
      }
      else {
        let data = result.rows;

        data = data.map(elem => {
          return new Account(
            elem.id,
            elem.account,
            elem.transaction,
            elem.amount,
            elem.btc_address
          );
        });

        callback(null, data);
      }
    });
  }

  static add(objAccount, callback) {
    let textQuery =
      `INSERT INTO "Accounts" (account, transaction, amount, btc_address) 
       VALUES ($1, $2, $3, $4) RETURNING *`;

    let arrData = [
      objAccount.account,
      objAccount.transaction,
      objAccount.amount,
      objAccount.btc_address
    ];

    pool.query(textQuery, arrData, (err, result) => {
      if (err) {
        callback(err, null);
      }
      else {
        let data = result.rows;

        data = data.map(elem => {
          return new Account(
            elem.id,
            elem.account,
            elem.transaction,
            elem.amount,
            elem.btc_address
          );
        });

        callback(null, data[0]);
      }
    });
  }

  static del(id, callback) {
    let textQuery = 
      `DELETE FROM "Accounts" WHERE id=$1`;

    let arrData = [ id ];

    pool.query(textQuery, arrData, (err, result) => {
      if(err) {
        callback(err, null);
      }
      else {
        callback(null, null);
      }
    });
  }
}

module.exports = Account;