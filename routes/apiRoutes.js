const express = require('express');
const blogController = require('../controllers/blogControler');

const router = express.Router();

router.get('/',blogController.home)

module.exports = router;