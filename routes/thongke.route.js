var express = require('express');
var multer = require('multer')
var router = express.Router();
var express = require('express');
var multer = require('multer')
var router = express.Router();

var authMiddleware = require("../middleware/auth.middleware.js");

var controller = require('../controllers/thongke.controller.js');


router.get('/', authMiddleware.requireAuth, controller.getStatistic)

module.exports = router