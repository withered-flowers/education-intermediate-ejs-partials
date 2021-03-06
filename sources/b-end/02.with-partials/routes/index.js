const express = require('express');
const router = express.Router();

// Jangan lupa untuk mengimport controller
const Controller = require('../controllers/controller');

const accounts = require('./accounts.js');

router.get('/', Controller.getRootHandler);

router.use('/accounts', accounts);

module.exports = router;