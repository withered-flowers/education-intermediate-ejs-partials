const express = require('express');
const router = express.Router();

const Controller = require('../controllers/controller');

const accounts = require('./accounts.js');

router.get('/', Controller.getRootHandler);

router.use('/accounts', accounts);

module.exports = router;