var express = require('express');
var multer = require('multer')
var router = express.Router();
var controller = require('../controllers/thongke.controller.js');


router.get('/', controller.getStatistic)

module.exports = router