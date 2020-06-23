const Account = require('../models/account.js');

class Controller {
  static getRootHandler(req, res) {
    res.render('home', {
      title: 'Halaman Utama'
    });
  }

  static getAccountRootHandler(req, res) {
    if(req.query.q === undefined) {
      Account.findAll((err, data) => {
        if(err) {
          res.send(err);
        }
        else {
          res.render('account-list', {
            title: "Account - List",
            dataAccount: data,
            specific: false
          })
        }
      });
    }
    else {
      let idInput = Number(req.query.q);

      Account.findOne(idInput, (err, data) => {
        if(err) {
          res.send(err);
        }
        else {
          res.render('account-list', {
            title: "Account - Detail",
            dataAccount: data,
            specific: true
          })
        }
      });
    }
  }

  static getAccountAddHandler(req, res) {
    res.render('account-add.ejs', {
      title: 'Account - Add'
    });
  }

  static postAccountAddHandler(req, res) {
    let objAccount = {
      account: req.body.acc_name,
      transaction: req.body.acc_trans,
      amount: req.body.acc_amount,
      btc_address: req.body.acc_btc_desc
    };

    Account.add(objAccount, (err, result) => {
      if(err) {
        res.send(err);
      }
      else {
        let newUrl = '/accounts?q=' + result.id;

        res.redirect(newUrl);
      }
    });
  }

  static getAccountDeleteHandler(req, res) {
    let idInput = req.params.id;

    Account.del(idInput, (err, result) => {
      if(err) {
        res.send(err);
      }
      else {
        res.redirect('/accounts');
      }
    });
  }
}

module.exports = Controller;