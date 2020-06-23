const express = require('express');
const router = express.Router();

// Jangan lupa untuk mengimport controller
const Controller = require('../controllers/controller');

// GET /accounts /
router.get('/', Controller.getAccountRootHandler);
router.get('/add', Controller.getAccountAddHandler);
router.post('/add', Controller.postAccountAddHandler);
router.get('/del/:id', Controller.getAccountDeleteHandler);

module.exports = router;