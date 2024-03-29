
var Theloai = require('../models/theloai.model.js')
var Admin = require('../models/admin.model.js')
var Tinmoi = require('../models/tinmoi.model.js')
var shortid = require('shortid')

module.exports.getIndex = function(req, res) {
	res.render('admin/index');
}

module.exports.getLogin = function(req, res) {
	res.render('admin/login');
}

module.exports.postLogin = async function(req, res) {
	// var name = req.body.name;
	// var password = req.body.password;
	// var admin = await Admin.findOne({ name: name})  // khi tìm đc thì admin tồn tại
	// // console.log(req.body.name)

	// if (!admin) {    // chưa tìm được
	// 	res.render('admin/login', {
	// 		errors: [
	// 			'admin does not exist'
	// 		],
	// 		values: req.body  // lưu lại giá trị khi nhập
	// 	});
	// 	return;
	// }

	
	// if (admin.password == password) {  // đã tìm được
	// 	res.cookie('adminId', admin._id, {
	// 		signed: true,
	// 	}, {expires: new Date(5000 + Date.now())});
	// 	res.redirect('/trangchu');
	// 	return
	// } 
	
	// res.render('admin/login', {
	// 	errors: [
	// 		'password incorrect'
	// 	],
	// 	values: req.body
	// });
	var name = req.body.name;
	var password = req.body.password;
	// console.log(req.body.name)
	function DoublyLinkedListNode(name, password) {
		this.name = name;
		this.password = password;
		this.next = null;
		this.prev = null;
	}

	function DoublyLinkedList() {
		this.head = null;
		this.tail = null;
		this.size = 0;
	}

	DoublyLinkedList.prototype.isEmpty = function() {
		return this.size == 0;
	}

	DoublyLinkedList.prototype.addLast = function (name, password) {
		if (this.tail === null) {
			this.tail = new DoublyLinkedListNode(name, password);
			this.head = this.tail;
		}
	}

	var list = new DoublyLinkedList()
	list.addLast(name, password)

	for (var node = list.head; node != null; node = node.next) {
		var adminName = await Admin.findOne({name: node.name})
		
		if (!adminName) {    // chưa tìm được
			res.render('admin/login', {
				errors: [
					'admin does not exist'
				],
				values: req.body  // lưu lại giá trị khi nhập
			});
			return;
		}

		
		if (adminName.password == node.password) {  // đã tìm được
			res.cookie('adminId', adminName._id, {
				signed: true,
			}, {expires: new Date(5000 + Date.now())});
			res.redirect('/trangchu');
			return
		} 	
		
		res.render('admin/login', {
			errors: [
				'password incorrect'
			],
			values: req.body
		});
			
	}

}

module.exports.getLogout = function (req, res) {
	  // res.clearCookie("adminId", {path: '/'})
	  // res.redirect("/trangchu")

	var idName = "adminId"
	function DoublyLinkedListNode(idName) {
		this.adminId = idName	;
		this.next = null;
		this.prev = null;
	}
	function DoublyLinkedList() {
		this.head = null;
		this.tail = null;
		this.size = 0;
	}

	DoublyLinkedList.prototype.isEmpty = function() {
		return this.size == 0;
	}
	DoublyLinkedList.prototype.addFirst = function (idName) {
		if (this.head === null) {
			this.head = new DoublyLinkedListNode(idName)
			this.tail = this.head;
		} else {
			var temp = new DoublyLinkedListNode(idName)
			temp.next = this.head;
			this.head.prev = temp;
			this.head = temp;
		}
		this.size++;

	}

	var listcookie = new DoublyLinkedList()
	listcookie.addFirst(idName)

	
	for (var node = listcookie.head; node != null; node = node.next) { 
		res.clearCookie(node.adminId, {path: '/'})
		res.redirect("/trangchu")
		return;
	}
	// res.clearCookie("adminId", {path: '/'})
	// res.redirect("/trangchu")
}

module.exports.createNews = async function (req, res) {
	var news = new Theloai
	news.thethao.push({
		id: 'asdf',
		title: 'testTitle',
		content: 'testContent'
	})

	news.save();
}

module.exports.postNews = async function(req, res) {
	var	imagePath 
	var	videoPath
	// tạo thời gian
	var d = new Date();
	var date = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
	var time = d.getHours() + ":" + d.getMinutes();
	// kiểm tra file được người dùng nhập vào
	var uploads = req.files;
	for (var upload of uploads ) {
		if (upload.mimetype == "video/mp4") {
			videoPath = upload.path.split('/').slice(1).join('/')  // cu phap gan video
		} else {
			imagePath = upload.path.split('/').slice(1).join('/')  // cu phap gan image, file
		}
	}
	// lấy dữ liệu tạo form nhập
	var ID  = "5ed51a3a31739358f02d0178"
	var title = req.body.title;
	var content = req.body.content;
	var newsId = shortid.generate(); // function tạo id 
	var hashtag = req.body.hashtag;
	var theloai = req.body.theloai;
	var trangthai = req.body.trangthai;
	var source = req.body.source;
	var firstNews;
	if (req.body.firstNews == "true") {
		firstNews = "true"
	} else {
		firstNews = "false"
	}
	
	var news = await Theloai.findOne({ _id: ID });  
	var tableTinmoi = await Tinmoi.find();
	//double linked list
	// danh sách liên kết có 3 phần
	// 1 node chứa dữ liệu
	function DoublyLinkedListNode(title, content, shortid, hashtag, imagePath, videoPath, theloai, firstNews, trangthai, thoigian, ngaythang, comment, source, chinhsua) {
		this.id = shortid
		this.title = title;
		this.content = content;
		this.hashtag = hashtag;
		this.image = imagePath;
		this.video = videoPath;
		this.theloai = theloai;
		this.firstNews = firstNews;
		this.trangthai = trangthai;
		this.thoigian = thoigian;
		this.ngaythang = ngaythang;
		this.comment = comment;
		this.source = source;
		this.chinhsua = chinhsua;
		this.next = null;
		this.prev = null;
	}
	// dslk
	function DoublyLinkedList() {
		this.head = null;
		this.tail = null;
		this.size = 0;

	}

	DoublyLinkedList.prototype.isEmpty = function() {
		return this.size == 0;
	}

	// các hàm thao tác trên dslk
	DoublyLinkedList.prototype.addFirst = function (title, content, shortid, hashtag, imagePath, videoPath, theloai, firstNews, trangthai, thoigian, ngaythang, comment, source, chinhsua) {

		if (this.head === null) {
			this.head = new DoublyLinkedListNode(title, content, shortid, hashtag, imagePath, videoPath, theloai, firstNews, trangthai, thoigian, ngaythang, comment, source, chinhsua);
			this.tail = this.head;
		} else {
			var temp = new DoublyLinkedListNode(title, content, shortid, hashtag, imagePath, videoPath, theloai, firstNews, trangthai, thoigian, ngaythang, comment, source, chinhsua);
			temp.next = this.head;
			this.head.prev = temp;
			this.head = temp;
		}
		this.size++;

	}

	DoublyLinkedList.prototype.addLast = function (title, content, shortid, hashtag, imagePath, videoPath, theloai, firstNews, trangthai, thoigian, ngaythang, comment, source, chinhsua) {
		if (this.tail === null) {
			this.tail = new DoublyLinkedListNode(title, content, shortid, hashtag, imagePath, videoPath, theloai, firstNews, trangthai, thoigian, ngaythang, comment, source, chinhsua);
			this.head = this.tail;
		} else {
			var temp = new DoublyLinkedListNode(title, content, shortid, hashtag, imagePath, videoPath, theloai, firstNews, trangthai, thoigian, ngaythang, comment, source, chinhsua);
			this.tail.next = temp;
			temp.prev = this.tail;
			this.tail = temp;
		}
		this.size++;
	}



	DoublyLinkedList.prototype.addLastTheloai = function (title, content, shortid, hashtag, imagePath, videoPath, theloai, firstNews, trangthai, thoigian, ngaythang, comment, source, chinhsua) {
		if (this.tail === null) {
			this.tail = new DoublyLinkedListNode(title, content, shortid, hashtag, imagePath, videoPath, theloai, firstNews, trangthai, thoigian, ngaythang, comment, source, chinhsua);
			this.head = this.tail;
			// thêm dữ liệu vào đúng table
			switch (this.head.theloai) {
				case "thethao":

					news.thethao.push({
						id: this.head.id,
						title: this.head.title,
						content: this.head.content,
						hashtag: this.head.hashtag,
						image: this.head.image,
						video:this.head.video,
						theloai: this.head.theloai,
						firstNews: this.head.firstNews,
						trangthai: this.head.trangthai,
						thoigian: this.head.thoigian,
						ngaythang: this.head.ngaythang,
						source: this.head.source,
						comment: [],
						chinhsua: []
					})
					news.save();
					break;

				case "giaitri":

					news.giaitri.push({
						id: this.head.id,
						title: this.head.title,
						content: this.head.content,
						hashtag: this.head.hashtag,
						image: this.head.image,
						video:this.head.video,
						theloai: this.head.theloai,
						firstNews: this.head.firstNews,
						trangthai: this.head.trangthai,
						thoigian: this.head.thoigian,
						ngaythang: this.head.ngaythang,
						source: this.head.source,
						comment: [],
						chinhsua: []

					})
					news.save();
					break;

				case "vanhoa":

					news.vanhoa.push({
						id: this.head.id,
						title: this.head.title,
						content: this.head.content,
						hashtag: this.head.hashtag,
						image: this.head.image,
						video:this.head.video,
						theloai: this.head.theloai,
						firstNews: this.head.firstNews,
						trangthai: this.head.trangthai,
						thoigian: this.head.thoigian,
						ngaythang: this.head.ngaythang,
						source: this.head.source,
						comment: [],
						chinhsua: []
					})
					news.save();
					break;

				case "giaoduc":

					news.giaoduc.push({
						id: this.head.id,
						title: this.head.title,
						content: this.head.content,
						hashtag: this.head.hashtag,
						image: this.head.image,
						video:this.head.video,
						theloai: this.head.theloai,
						firstNews: this.head.firstNews,
						trangthai: this.head.trangthai,
						thoigian: this.head.thoigian,
						ngaythang: this.head.ngaythang,
						source: this.head.source,
						comment: [],
						chinhsua: []
					})
					news.save();
					break;

				case "kinhte":

					news.kinhte.push({
						id: this.head.id,
						title: this.head.title,  // pHead -> title
						content: this.head.content,
						hashtag: this.head.hashtag,
						image: this.head.image,
						video:this.head.video,
						theloai: this.head.theloai,
						firstNews: this.head.firstNews,
						trangthai: this.head.trangthai,
						thoigian: this.head.thoigian,
						ngaythang: this.head.ngaythang,
						source: this.head.source,
						comment: [],
						chinhsua: []
					})
					news.save();
					break;

				case "xahoi":

					news.xahoi.push({
						id: this.head.id,
						title: this.head.title,
						content: this.head.content,
						hashtag: this.head.hashtag,
						image: this.head.image,
						video:this.head.video,
						theloai: this.head.theloai,
						firstNews: this.head.firstNews,
						trangthai: this.head.trangthai,
						thoigian: this.head.thoigian,
						ngaythang: this.head.ngaythang,
						source: this.head.source,
						comment: [],
						chinhsua: []
					})
					news.save();
					break;

				case "thegioi":

					news.thegioi.push({
						id: this.head.id,
						title: this.head.title,
						content: this.head.content,
						hashtag: this.head.hashtag,
						image: this.head.image,
						video:this.head.video,
						theloai: this.head.theloai,
						firstNews: this.head.firstNews,
						trangthai: this.head.trangthai,
						thoigian: this.head.thoigian,
						ngaythang: this.head.ngaythang,
						source: this.head.source,
						comment: [],
						chinhsua: []
					})
					news.save();
					break;

				case "phapluat":

					news.phapluat.push({
						id: this.head.id,
						title: this.head.title,
						content: this.head.content,
						hashtag: this.head.hashtag,
						image: this.head.image,
						video:this.head.video,
						theloai: this.head.theloai,
						firstNews: this.head.firstNews,
						trangthai: this.head.trangthai,
						thoigian: this.head.thoigian,
						ngaythang: this.head.ngaythang,
						source: this.head.source,
						comment: [],
						chinhsua: []
					})
					news.save();
					break;

				default:
					break;
			}
		} 
		this.size++;
	}

	var listTheloai = new DoublyLinkedList()
	var listTinmoi = new DoublyLinkedList()



	//kiể tra file nếu là ảnh thì video=null và ngược lai
	if (imagePath) {
		// them vao table Theloai
		listTheloai.addLastTheloai(title, content, newsId, hashtag, imagePath, null, theloai, firstNews, trangthai, time, date, "", source)


		// nếu không có dữ liệu trong db thì tạo mới
		if (!tableTinmoi[0]) {

			tableTinmoi = new Tinmoi({
				id: newsId,
				title: title,
				content: content,
				hashtag: hashtag,
				image: imagePath,
				video: null,
				theloai: theloai,
				firstNews: firstNews,
				trangthai: trangthai,
				thoigian: time,
				ngaythang: date,
				source: source,
				comment: [],
				chinhsua: []
			})
			tableTinmoi.save();

		} else {
			// nếu có thì lấy trong database lưu vào dslk đôi
			for (var i = 0; i < tableTinmoi.length; i ++) {
				var item = tableTinmoi[i]
				listTinmoi.addLast(
					item.title, 
					item.content, 
					item.id, 
					item.hashtag, 
					item.image, 
					item.video, 
					item.theloai, 
					item.firstNews, 
					item.trangthai, 
					item.thoigian, 
					item.ngaythang,
					item.comment,
					item.source,
					item.chinhsua
				)
			}
			
			// sau khi lưu vào dslk thì xóa trong database
			await Tinmoi.deleteMany({});  // cu phap drop collection



			// lưu vào dslk xong thì thêm vào đầu dslk đôi,
			listTinmoi.addFirst(
				title, 
				content, 
				newsId, 
				hashtag, 
				imagePath, 
				null, 
				theloai, 
				firstNews, 
				trangthai, 
				time, 
				date,
				[],
				source,
				[]
			)



			// llưu từ dslk về lại database
			for (var node = listTinmoi.head; node != null; node = node.next) {   // cú pháp lặp qua dslk
					var object = {
						id: node.id,
						title: node.title,
						content: node.content,
						hashtag: node.hashtag,
						image: node.image,
						video: node.video,
						theloai: node.theloai,
						firstNews: node.firstNews,
						trangthai: node.trangthai,
						thoigian: node.thoigian,
						ngaythang: node.ngaythang,
						comment: node.comment,
						source: node.source,
						chinhsua: node.chinhsua
					}

					
					tableTinmoi = new Tinmoi(object)
					tableTinmoi.save();
			}
				
		}
		
	}

	// tương tự như trên, thay imagePath = null
	if (videoPath) {
		//them vao table Theloai
		listTheloai.addLastTheloai(title, content, shortid, hashtag, null, videoPath, theloai, firstNews, trangthai, time, date, "", source)
		// them vao table Tinmoi
		// nếu không có dữ liệu trong db thì tạo mới
		if (!tableTinmoi[0]) {
			tableTinmoi = new Tinmoi({
				id: newsId,
				title: title,
				content: content,
				hashtag: hashtag,
				image: null,
				video: videoPath,
				theloai: theloai,
				firstNews: firstNews,
				trangthai: trangthai,
				thoigian: time,
				ngaythang: date,
				comment: [],
				source: source,
				chinhsua: []
			})
			tableTinmoi.save();
		} else {
			// lấy từ db và lưu vào dslk đôi
			for (var i = 0; i < tableTinmoi.length; i ++) {
				var item = tableTinmoi[i]
				listTinmoi.addLast(
					item.title, 
					item.content, 
					item.id, 
					item.hashtag, 
					item.image, 
					item.video, 
					item.theloai, 
					item.firstNews, 
					item.trangthai, 
					item.thoigian, 
					item.ngaythang,
					item.comment,
					item.source,
					item.chinhsua
				)
			}
			await Tinmoi.deleteMany({});

			// lưu xong thì thêm vào đầu dslk đôi,
			listTinmoi.addFirst(
				title, 
				content, 
				newsId, 
				hashtag, 
				null, 
				videoPath, 
				theloai, 
				firstNews, 
				trangthai, 
				time, 
				date,
				[],
				source,
				[]
			)

			// llưu từ dslk về lại tableTinmoi sau đó save
			for (var node = listTinmoi.head; node != null; node = node.next) {
					var object = {
						id: node.id,
						title: node.title,
						content: node.content,
						hashtag: node.hashtag,
						image: node.image,
						video: node.video,
						theloai: node.theloai,
						firstNews: node.firstNews,
						trangthai: node.trangthai,
						thoigian: node.thoigian,
						ngaythang: node.ngaythang,
						comment: node.comment,
						source: node.source,
						chinhsua: node.chinhsua
					}

					tableTinmoi = new Tinmoi(object)
					tableTinmoi.save();
			 }
		}
	}


	res.redirect('/trangchu')

}

module.exports.deleteDemo = async function(req, res) {
	var news = await Theloai.findOne({_id : ""})

	for (var i = 0; i < news.thethao.length; i ++) {
		if (news.thethao[i].title == "double List")  {
			news.thethao.splice(i, 1);
			news.save();
		}
	}

	res.redirect('/');
}