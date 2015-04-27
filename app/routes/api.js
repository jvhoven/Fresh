var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

// Controllers -------------------

var entries = require('../controllers/entry.controller.js');

// Routes -------------------------
router.get('/entries', entries.list);
router.post('/entry', entries.create);
router.get('/entry/:id', entries.read);

module.exports = router;