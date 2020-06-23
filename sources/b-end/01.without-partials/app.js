const express = require('express');
const app = express();

const PORT = 3000;

const routes = require('./routes/index.js');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Aplikasi berjalan di port ${PORT}`);
});