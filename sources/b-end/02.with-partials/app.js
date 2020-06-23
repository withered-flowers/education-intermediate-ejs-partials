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