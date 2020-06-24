## Table of Content
1. [Interlude - SoC](#interlude---soc)
1. [Intro - Components](#intro---componentes)
1. [EJS - Partials](#ejs---partials)
1. [References](#references)

## Interlude - SoC
Menjadi seorang developer adalah menjadi seseorang yang memiliki mindset
"kemalasan" yang hakiki, dalam artian adalah kita harus memiliki pemikiran
untuk melakukan sesuatu dengan "malas" dan efisien.

Contohnya dalam kode yang kita tuliskan, misalnya, apabila ada kode yang kita
panggil berulang kali, sama terus-terusan, maka akan kita buatkan dalam 
sebuah fungsi (atau bahkan sebuah class, jika sudah paham OOP), kemudian
akan kita panggil berkali kali bukan?

Secara tidak langsung kita sudah menggunakan konsep yang dinamakan dengan
DRY (Don't Repeat Yourself).

Begitu pula ketika kita sudah mempelajari tentang MVC, dimana kita mengkotak-
kotakkan domain berdasarkan kebutuhan atau kepentingan yang adanya, Controller
hanyalah untuk processing, Model untuk representasi data, dan View untuk 
representasi *User Interface*, maka secara tidak langsung, kita juga sudah
menerapkan prinsip yang dinamakan dengan *Separation of Concern* atau disingkat
dengan `SoC`.

Namun kalau kita lihat kembali, pada View yang kita buat, umumnya masih ada
banyak sekali kesamaan yang kita bentuk (not DRY) dan masih tidak ada pemisahan
SoC-nya bukan?

Bagaimana cara kita menerapkan DRY dan SOC ini di dalam *User Interface* yang 
sudah kita buat?

Untuk itu kita harus mempelajari terlebih dahulu apa yang disebut dengan
*Components*

## Intro - Components
Maaf yah, ini kata kata teori yang harus kalian dengar :) 
*Component* adalalah serangkaian fungsi yang modular, portabel, bisa diganti-
ganti, dan digunakan kembali, dimana pada saat diimplementasikan akan memiliki
enkapsulasi dan bisa diekspor sebagai antarmuka yang lebih tinggi.

Bosan bukan dengar kata kata seperti itu?

Intinya adalah, pengemasan sesuatu yang berulang-ulang yang memiliki fungsi yang
sama, dalam bentuk suatu barang / bentuk yang lebih tinggi lagi.

Misalnya dalam konsep *User Interface* (HTML) nih,
Kita mengkelompokkan 2 label, 2 input text, dan sebuah button, menjadi sesuatu
yang dinamakan dengan `SimpleForm` atau, kita mengkelompokkan sebuah tulisan
besar dan beberapa navigasinya menjadi sebuah `Header` dalam aplikasi kita.

Sudah *nangkep* maksudnya?

Nah sekarang kita akan mencoba untuk implementasikan itu di dalam aplikasi kita
dengan menggunakan `Partials` pada ejs.

## EJS - Partials
`Partials` pada EJS merupakan "pemanggilan kembali" kumpulan *User Interface* 
yang sudah pernah kita definisikan kembali ke dalam aplikasi kita.

Contoh, ini saya memiliki sebuah aplikasi sederhana untuk membaca data dalam
bentuk tabel yah, kira kira seperti ini.

Misalnya kita akan membuat aplikasi yang memiliki endpoint sebagai berikut:

| Endpoint                  | Description                                   |
| ------------------------- | --------------------------------------------- |
| GET /                     | Menampilkan halaman home                      |
| GET /accounts             | Menampilkan list semua                        |
| GET /accounts?q=<id>      | Menampilkan list detail sebuah account        |

Jadi dari sini apakah yang harus kita lakukan terlebih dahulu?

### Langkah 1 - Inisialisasi npm dan .gitignore
Pertama tama kita akan melakukan:
1. Inisialisasi npm dengan `npm init -y`
1. Pasang module yang dibutuhkan terlebih dahulu dengan mengetik
   `npm install express ejs pg`
1. Pasang module development yang dibutuhkan terlebih dahulu dengan mengetik
   `npm install -D nodemon`
1. Jangan lupa exclude folder `node_modules` dengan membuat file `.gitignore`

### Langkah 2 - Buat struktur folder terlebih dahulu
Struktur akhir folder yang akan dibentuk adalah sebagai berikut:
```
.
├── config
│   └── config.js
├── controllers
│   └── controller.js
├── data
│   └── dummy.json
├── migrations
│   └── createdb.js
├── models
│   └── account.js
├── node_modules
│   └── ... 
├── routes
│   ├── accounts.js
│   └── index.js
├── seeders
│   └── seed.js
├── views
│   ├── account-list.ejs
│   └── home.ejs
├── app.js
├── package.json
└── package-lock.json
```

Oleh karena itu, kita akan membuat folder yang belum terbentuk terlebih
dahulu yaitu:
* config (untuk menyimpan konfigurasi database pg)
* controllers (untuk menyimpan semua controller yang ada)
* data (berisi data awal, sebelum masuk ke db)
* migrations (berisi file yang berhubungan dengan pembuatan tabel db)
* models (berisi representasi data yang ada)
* routes (berhubungan dengan rute endpoint yang akan didefinisikan)
* seeders (berhubungan dengan input data awal ke dalam db)
* views (berhubungan dengan tampilan / user interface)

### Langkah 3 - Membuat db dan file config/config.js
Selanjutnya kita akan membuat konfigurasi terhadap database yang akan gunakan.
Pada pembelajaran ini kita akan menggunakan database `postgresql`.

Untuk itu kita akan membuat database nya terlebih dahulu, bukalah 
postgresql dengan tools kesayangan yang dimiliki (postico / pgadmin / 
phpmyadmin / etc) dan buatlah sebuah database dengan nama yang disukai.

Kemudian kita akan membuatnya supaya dapat terkoneksi dengan nodejs via 
module `pg`. Konsepnya yang akan kita gunakan adalah `Pool`.

Berikut adalah cara untuk mengkoneksikan database dengan mengambil `Pool` pada
database `postgresql`

Berikut adalah kode pada file `config/config.js`
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  host: "your_host_here",
  database: "your_db_here",
  user: "your_name_here",
  password: "your_pass_here"
});

module.exports = pool;
```

Setelah ini `pool` siap digunakan.

### Langkah 4 - Mempelajari dan membuat Tabel.
Selanjutnya kita akan membuka file `data/dummy.json` untuk mempelajari lebih
lanjut apa sajakah data yang harus ada dan bagaimana membuat tabelnya.

Dari file `data/dummy.json` diketahui bahwa pada tabel yang dibutuhkan harus
memiliki properti sebagai berikut:
* account dengan tipe Text
* transaction dengan tipe Text
* amount dengan tipe Angka ber-koma
* btc_address dengan tipe Text

Setelah ini kita akan membuat tabel tersebut dengan menggunakan nodejs juga.

Untuk itu dibutuhkan sebuah file pada folder `migrations` untuk pembuatan
tabel ini. kita beri nama `createdb.js`.

Asumsi: nama tabel yang dibuat adalah `Accounts`

File ini akan memiliki kode sebagai berikut
```javascript
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
```

Selanjutnya setelah file ini dibuat, kita akan coba menjalankannya, 
dan melihatnya pada database kita, apakah tabel `Accounts` sudah
terbentuk?

### Langkah 5 - Seeding data
Mencoba dalam pengembangan aplikasi, tak lengkap kl tak ada data dummy.

Pada pembelajaran kali ini juga sudah disediakan data dummy pada 
file `data/dummy.json`

Oleh karena itu kita akan berusaha untuk memasukkan data yang ada ke dalam
tabel `Account` yang sudah kita buat.

Caranya adalah dengan membuat sebuah file yang akan digunakan untuk memasukkan
data, yaitu `seeds/seed.js`

Berikut adalah kode pada file `seeds/seed.js`
```javascript
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

```

Setelah file ini selesai kita buat, jangan lupa untuk menjalankannya
dan melihat hasilnya pada database kita, apakah tabelnya sudah ada data?

### Langkah 6 - Membuat views terlebih dahulu
Untuk mempersingkat loncatan-loncatan yang ada ketika membuat kode ini nantinya,
maka kita akan membuat aplikasi ini dari viewnya terlebih dahulu.

Berdasarkan endpoint yang dibutuhkan diketahui bahwa sebenarnya kita membutuhkan
3 view, untuk `home`, untuk `account-list-semua`, dan untuk 
`account-list-specific`. Hanya saja kita dapat mengurangi itu menjadi 2 saja,
yaitu dengan `home` dan `account-list`. 

Oleh karena kita hanya akan membuat 2 view saja, yaitu `views/home.ejs` dan
`views/account-list.ejs`.

Berdasarkan itu, maka `views/home.ejs` akan terbentuk menjadi seperti berikut:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= title %></title>
</head>
<body>
  <!-- Ceritanya ini header -->
  <nav>
    <h1><%= title %></h1>
    <a href="/">Home</a>
    <a href="/accounts">Accounts</a>
  </nav>

  <!-- Nanti konten kita masukkan di sini -->
  <div style="padding-top: 20px; padding-bottom: 20px;">
    Nanti kita cerita tentang hari ini yah
  </div>

  <!-- Ceritanya ini footer -->
  <footer>
    &#169; PT. Ini Websiteku Mana Websitemu dot com - 2020
  </footer>
</body>
</html>
```

Dicatat bahwa pada halaman `views/home.ejs` ini membutuhkan sebuah 
parameter dengan nama `title`.

Selanjutnya untuk `views/account-list.ejs`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= title %></title>
</head>
<body>
  <!-- Ceritanya ini header -->
  <nav>
    <h1><%= title %></h1>
    <a href="/">Home</a>
    <a href="/accounts">Accounts</a>
  </nav>

  <!-- Nanti konten kita masukkan di sini -->
  <div style="padding-top: 20px; padding-bottom: 20px;">
    <div>
      <a href="/accounts/add">Tambah Akun Baru</a>
    </div>
  <% if(!specific) { %>
    <!-- Kalau mau baca semuanya -->
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>account</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <% dataAccount.forEach(elem => { %>
        <tr>
          <td><%= elem.id %></td>
          <td><%= elem.account %></td>
          <td>
            <a href="/accounts?q=<%= elem.id %>">Detail</a>
            <a href="/accounts/del/<%= elem.id %>">Delete</a>
          </td>
        </tr>
        <% }) %>
      </tbody>
    </table>
  <% } else { %>
  <!-- Kalau mau baca spesifik -->
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>account</th>
          <th>transaction</th>
          <th>amount</th>
          <th>btc_address</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <% dataAccount.forEach(elem => { %>
        <tr>
          <td><%= elem.id %></td>
          <td><%= elem.account %></td>
          <td><%= elem.transaction %></td>
          <td><%= elem.amount %></td>
          <td><%= elem.btc_address %></td>
          <td>
            <a href="/accounts/del/<%= elem.id %>">Delete</a>
          </td>
        </tr>
        <% }) %>
      </tbody>
    </table>
  <% } %>
  </div>

  <!-- Ceritanya ini footer -->
  <footer>
    &#169; PT. Ini Websiteku Mana Websitemu dot com - 2020
  </footer>
</body>
</html>
```

Dicatat bahwa pada halaman `views/account-list.ejs` membutuhkan 3
buah parameter:
* `title` untuk judul halaman
* `dataAccount` untuk tampilan data
* `specific` untuk membedakan antara tampilkan semua atau spesifik

### Langkah 7 - Implementasikan Partials
Dapat kita lihat bahwa baik pada `views/home.ejs` dan `views/account-list.ejs`
Memiliki beberapa kesamaan, yaitu sama-sama memiliki `bagian kepala` dan 
`bagian kaki` yang sama.

Oleh karena itu, kita bisa menggunakan `Partials` pada ejs untuk mengurangi
redundansi tersebut.

Untuk itu selanjutnya kita akan membuat folder `partials` di dalam folder
`views` dan kita akan membuat dua file:
* `views/partials/header.ejs`
* `views/partials/footer.ejs`

Kemudian kita akan memindahkan bagian yang merupakan header `<nav>`
pada `views/partials/header.ejs` dan footer `<footer>` pada 
`views/partials/footer.ejs`.

Sehingga kode pada `views/partials/header.ejs` akan menjadi:
```html
<nav>
  <h1><%= title %></h1>
  <a href="/">Home</a>
  <a href="/accounts">Accounts</a>
</nav>
```

Kode pada `views/partials/footer.ejs` akan menjadi:
```html
<footer>
  &#169; PT. Ini Websiteku Mana Websitemu dot com - 2020
</footer>
```

Kemudian pada `views/home.ejs` dan `views/account-list.ejs` pada bagian
`header` dan `footer` nya akan kita ganti menjadi
```html
...
  <!-- Ceritanya ini header -->
  <%- include('partials/header.ejs') %>
...
  <!-- Ceritanya ini footer -->
  <%- include('partials/footer.ejs') %>
...
```

Sampai dengan tahap ini, artinya untuk views nya sudah terbentuk dengan baik dan sudah mengimplementasikan partial dengan baik.

Horeeee bahan kita sudah selesai !

Tinggal mencobanya ^_^

### Langkah 8 - Membuat models/account.js
Selanjutnya, untuk mempermudah kita akan coba untuk membuat `models/account.js`
yang akan merepresentasikan data `Account` nya.

file ini akan direpresentasikan dalam bentuk Class dan memiliki 2 buah method:
* findAll untuk mencari semua Akun dalam tabel.
* findSpecific untuk mencari Akun spesifik dalam tabel.

Jangan lupa juga karena file ini akan berinteraksi langsung dengan 
database, maka akan membutuhkan require dari config yang sudah dibuat.

File ini akan kita representasikan dalam kode sebagai berikut:
```javascript
const pool = require('../config/config.js');

class Account {
  constructor(id, account, transaction, amount, btc_address) {
    this.id = id;
    this.account = account;
    this.transaction = transaction;
    this.amount = amount;
    this.btc_address = btc_address;
  }

  // digunakan pada GET /accounts
  // menerima 1 parameter callback
  //   callback menerima 2 parameter
  //     err <-- Untuk hasil bila error
  //     result <-- Untuk output hasil
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

  // digunakan pada GET /accounts?q=id
  // menerima 2 parameter: id dan callback
  //   id untuk mencari spesifik yang mana
  //   callback menerima 2 parameter
  //     err <-- Untuk hasil bila error
  //     result <-- Untuk output hasil
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
}

module.exports = Account;
```

Sampai dengan tahap ini, artinya kita sudah berhasil menuliskan kode untuk
berhubungan dengan database. Selanjutnya kita akan membuat controller yang
dibutuhkan untuk menerima input dari browser / user.

### Langkah 9 - Membuat controllers/controller.js
Pada langkah ini kita akan membuat handler untuk menerima input dari user dan
melemparkannya kembali ke Model atau View, yaitu dengan membuat Controller !

Controller ini akan dinamakan dengan `controllers/controller.js` dan akan
menghandle seluruh endpoint yang ada.

Untuk kodenya akan didefinisikan sebagai berikut:
```javascript
const Account = require('../models/account.js');

class Controller {
  // GET / handler
  static getRootHandler(req, res) {
    res.render('home', {
      title: 'Halaman Utama'
    });
  }

  // GET /accounts handler dan
  // GET /accounts?q=id handler
  static getAccountRootHandler(req, res) {
    // Cek apakah q ada atau tidak
    // Kalau tidak ada = /accounts
    // Kalau ada = /accounts?q=id
    // Sama-sama render account-list
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
}

module.exports = Controller;
```

Sampai dengan tahap ini artinya kita sudah berhasil untuk menghandle 
user input / browser input dan endpoint yang ada !

Sekarang saatnya untuk mendefinisikan endpoint yang ada dalam rute rute 
yang akan dibentuk !

### Langkah 10 - Membuat routes
Untuk membuat routes, awalnya kita harus berpikir untuk mengkotak-kotakan, rute
yang ada, dari aplikasi yang kita buat, terbagi jadi rute `root` atau `/` dan 
rute `accounts`, sehingga pada folder `routes` kita akan membuat 2 file baru:
* `accounts.js` untuk semua yang rute yang berhubungan dengan rute `accounts`
* `index.js` semua rute akan dihandle di sini.

Berdasarkan keterangan di atas, maka kita akan membaut `routes/accounts.js`
menjadi seperti berikut:
```javascript
const express = require('express');
const router = express.Router();

// Jangan lupa untuk mengimport controller
const Controller = require('../controllers/controller');

// GET /accounts /
router.get('/', Controller.getAccountRootHandler);

module.exports = router;
```

Sedangkan untuk `routes/index.js` akan kita tuliskan sebagai berikut:
```javascript
const express = require('express');
const router = express.Router();

// Jangan lupa untuk mengimport controller
const Controller = require('../controllers/controller');

const accounts = require('./accounts.js');

router.get('/', Controller.getRootHandler);

router.use('/accounts', accounts);

module.exports = router;
```

Sampai dengan tahap ini artinya kita sudah membuat:
* halaman (view) yang memiliki parameter
* model (data) atau representasi data dari database dalam aplikasi
* controller (logic) untuk berinteraksi dengan aplikasi
* routes untuk gerbang atau endpoint dari aplikasi yang kita buat

Selanjutnya, kita akan membuat main apps kita, supaya dapat berjalan, yaitu
dengan membuat file `app.js`

### Langkah 11 - Membuat app.js !
Pada file `app.js` kita akan menggabungkan semua yang ada.

Berikut adalah kode yang akan ditulis pada file `app.js`:
```javascript
const express = require('express');
const app = express();

// Definisikan port yang akan digunakan
const PORT = 3000;

// Jangan lupa untuk memanggil semua rute yang sudah 
// didefinisikan
const routes = require('./routes/index.js');

// Jangan lupa untuk mendefinisikan bahwa kita akan menggunakan
// templating engine EJS
app.set('view engine', 'ejs');

// Jangan lupa untuk menggunakan middleware body-parser
// supaya kita bisa mengambil data dari form
// bila akan dibuat
app.use(express.urlencoded({extended: false}));

// Gunakan rute yang sudah kita definisikan
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Aplikasi berjalan di port ${PORT}`);
});
```

Sampai dengan tahap ini artinya kita sudah berhasil untuk membuat 
web apps kita dan sudah bisa kita jalankan !

Selamat 🔥 !

## Additional - Review CR-D
Misalnya sekarang kita akan menambahkan beberapa endpoint sehingga menjadi sbb:

| Endpoint                  | Description                                   |
| ------------------------- | --------------------------------------------- |
| GET /                     | Menampilkan halaman home                      |
| GET /accounts             | Menampilkan list semua                        |
| GET /accounts?q=<id>      | Menampilkan list detail sebuah account        |
| ------------------------- | --------------------------------------------- |
| GET /accounts/add         | Menampilkan form penambahan account           |
| POST /accounts/add        | Menghandle form penambahan account            |
| GET /accounts/del/:id     | Menghapus sebuah account                      |

Bagaimanakah cara membuatnya?

## References
[Components - TutorialPoints](https://www.tutorialspoint.com/software_architecture_design/component_based_architecture.htm)