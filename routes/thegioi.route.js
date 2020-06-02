var express = require('express');
var multer = require('multer')
var router = express.Router();
var thegioiController = require('../controllers/thegioi.controller.js');
var indexController = require('../controllers/index.controller.js');

var image = multer({ dest: './public/image/'});

router.get('/', thegioiController.getIndex)

router.get('/news/:id', indexController.getNews)

router.post('/comment/:id', indexController.postComment)

router.post('/newComment/:id', indexController.postNewComment)

router.post('/deleteComment/:id', indexController.deleteComment)

router.post('/updateNews/:id', 
	image.array('image', 12),
	indexController.updateNews
)

router.post('/deleteNews/:id', indexController.deleteNews)



module.exports = router