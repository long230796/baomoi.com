var Tinmoi = require('../models/tinmoi.model.js')
var Theloai = require('../models/theloai.model.js')
var Session = require('../models/session.model.js')
var Admin = require('../models/admin.model.js')
var shortid = require('shortid')
var	globalBaivietxemnhieu

module.exports.getIndex = async function (req, res) {
	var sessionId = req.signedCookies.sessionId
	var adminId = req.signedCookies.adminId
	var tinmoi = await Tinmoi.find({});
	var tinmoiTemp = await Tinmoi.find({});
	var theloai = await Theloai.findOne({_id: "5ed51a3a31739358f02d0178"})
	var sessionTable = await Session.find()
	
	// find max length comment.
	var maxComment = tinmoiTemp;   //vì thay đổi giá trị của maxComment củng thay đổi giá trị của giá trị gán với nó 
	var temp;						//nên dùng 1 table tinmoi tạm để tìm maxComment					
    for(var i = 0; i < maxComment.length - 1; i++){
        for(var j = i + 1; j < maxComment.length; j++){
            if(maxComment[i].comment.length < maxComment[j].comment.length){
                // Hoan vi 2 so maxComment[i].comment.length va maxComment[j].comment.length
                temp = maxComment[i]
                maxComment[i] = maxComment[j]
                maxComment[j] = temp   
            }
        }
    }
	maxComment.splice(6)

	// find baivietdaxem
	var idBaivietdaxem = []
	for (element of sessionTable) {
		if (element.baivietdaxem[0]) {
			for (item of element.baivietdaxem) {
				idBaivietdaxem.push(item)
			}
		}
	}

	// dem so lan xuat hien cua id
	var  countId = {};
	for (element of idBaivietdaxem) {
		countId[element.id] = (countId[element.id] || 0) + 1
	}

	// sap xep theo thu tu tang dan
	keysSorted = Object.keys(countId).sort(function(a,b){
	  return countId[b]-countId[a]
	})

	// tim kiem trong tableTinmoi va luu vao mang
	var baivietxemnhieu = []
	for (element of keysSorted) {
		var data = await Tinmoi.findOne({id: element})
		if (data) {
			baivietxemnhieu.push(data)	
		}
	}	

	// loc ra 5 bai viet xem nhieu
	baivietxemnhieu = baivietxemnhieu.slice(0, 10)
	globalBaivietxemnhieu = baivietxemnhieu
	// console.log(keysSorted)

	console.log(baivietxemnhieu)


	res.render('index', {
		tinmois: tinmoi,
		theloais: theloai,
		sessionId: sessionId,
		adminId: adminId,
		maxComments: maxComment,
		baivietxemnhieu: baivietxemnhieu
	})
}




module.exports.getNews = async function (req, res) {
	var d = new Date();
	var date = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();

	var sessionId = req.signedCookies.sessionId
	var adminId = req.signedCookies.adminId
	var id = req.params.id;
	var news = await Tinmoi.findOne({id: id})
	var theloai = news.theloai
	var tinlienquan = await Tinmoi.find({theloai: theloai})
	var allNews = await Tinmoi.find({})
	var session = await Session.findOne({sessionId: sessionId})
	session.theloaidaxem.push(theloai)
	session.baivietdaxem.push({id: id, date: date})
	session.save()
	// console.log(globalBaivietxemnhieu)
	res.render('news', {
		news: news,
		tinlienquan: tinlienquan,
		allNews: allNews,
		adminId: adminId,
		session: session,
		baivietxemnhieu: globalBaivietxemnhieu
	})

}

module.exports.postComment = async function (req, res) {
	var name = req.body.name;
	var email = req.body.email;
	var comment = req.body.content;
	var rating = req.body.rating
	var sessionId = req.signedCookies.sessionId

	var d = new Date();
	var date = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
	var time = d.getHours() + ":" + d.getMinutes();

	var id = req.params.id;
	var idCommenter = shortid.generate()
	var news = await Tinmoi.findOne({id: id})
	var session = await Session.findOne({sessionId: sessionId})

	var theloaihientai = news.theloai;
	var tableTheloai = await Theloai.findOne({_id: "5ed51a3a31739358f02d0178"})
	var lengthTheloai = tableTheloai[theloaihientai].length;

	// luu vao danh sach lien ket 
	function DoublyLinkedListNode(id, name, email, comment, rating, date, time, idCommenter, theloai) {
		this.newsId = id;
		this.idCommenter = idCommenter;
		this.name = name;
		this.email = email;
		this.comment = comment;
		this.rating = rating;
		this.date = date;
		this.time = time;
		this.theloai = theloai;
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

	DoublyLinkedList.prototype.addLast = function (id, name, email, comment, rating, date, time, idCommenter, theloai) {
		if (this.tail === null) {
			this.tail = new DoublyLinkedListNode(id, name, email, comment, rating, date, time, idCommenter, theloai);
			this.head = this.tail;

			news.comment.push({
				newsId: this.head.newsId,
				idCommenter: this.head.idCommenter,
				name: this.head.name,
				email: this.head.email,
				comment: this.head.comment,
				rating: this.head.rating,
				date: this.head.date,
				time: this.head.time,
				theloai: this.head.theloai

			})
			session.idCommenter = this.head.idCommenter;
			session.save();
			news.save();

			for (var i = 0; i < lengthTheloai; i ++) {
				if (tableTheloai[theloaihientai][i].id == id) {
					tableTheloai[theloaihientai][i].comment.push({
						newsId: this.head.newsId,
						idCommenter: this.head.idCommenter,
						name: this.head.name,
						email: this.head.email,
						comment: this.head.comment,
						rating: this.head.rating,
						date: this.head.date,
						time: this.head.time,
						theloai: this.head.theloai
					})
					// using push with the subdocomment, mongoose dont know that this field has changed. so doesn't save
					// using markModified and specified the path you want to save
					tableTheloai.markModified(theloaihientai)
					tableTheloai.save()
					break;
				}
			}
		} 
	}

	var dll = new DoublyLinkedList
	dll.addLast(id, name, email, comment, rating, date, time, idCommenter, theloaihientai );

	res.redirect("/trangchu/tin-tuc-hot/" + id);


}


module.exports.postNewComment = async function (req, res) {
	var idNews = req.params.id;
	var newComment = req.body.newComment;
	var newRating = req.body.rating;
	var idCommenter = req.body.idCommenter;

	var news = await Tinmoi.findOne({id: idNews})

	var theloaihientai = news.theloai;
	var theloai = await Theloai.findOne({_id: "5ed51a3a31739358f02d0178"})
	var lengthTheloai = theloai[theloaihientai].length;

	function DoublyLinkedListNode(newComment, newRating, theloai) {
		this.newComment = newComment;
		this.newRating = newRating;
		this.theloai = theloai
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

	DoublyLinkedList.prototype.addLast = function (newComment, newRating, theloai) {
		if (this.tail === null) {
			this.tail = new DoublyLinkedListNode(newComment, newRating, theloai);
			this.head = this.tail;

			// cập nhật trong tableTinmoi
			for (var i = 0; i < news.comment.length; i ++) {
				// nếu tìm thấy thì thay giá trị bằng giá trị mới
				if (news.comment[i].idCommenter == idCommenter) {
					news.comment[i].comment = this.head.newComment;
					news.comment[i].rating = this.head.newRating;
					news.comment[i].theloai = this.head.theloai;
					news.markModified("comment")
					news.save()
					break;
				}
			}
			

			// cập nhật trong tableTheloai
			for (var i = 0; i < lengthTheloai; i ++) {
				// tỉm ra bài biết chứa comment 
				if (theloai[theloaihientai][i].id == idNews) {
					// nếu tìm thấy thì lặp qua các comment để tìm comment muốn sửa
					for (var j = 0; j < theloai[theloaihientai][i].comment.length; j ++) {
						if (theloai[theloaihientai][i].comment[j].idCommenter == idCommenter) {
							// khi tìm thấy thì thay đổi giá trị bằng giá trị mới											
							theloai[theloaihientai][i].comment[j].comment = this.head.newComment
							theloai[theloaihientai][i].comment[j].rating = this.head.newRating
							theloai[theloaihientai][i].comment[j].theloai = this.head.theloai
							// using push with the subdocomment, mongoose dont know that this field has changed. so doesn't save
							// using markModified and specified the path you want to save
							theloai.markModified(theloaihientai)
							theloai.save()
							break;

						}
					}
				}
			}
		} 
	}

	var dll = new DoublyLinkedList()
	//gọi hàm addlast của dslk
	dll.addLast(newComment, newRating, theloaihientai);
	res.redirect("/trangchu/tin-tuc-hot/" + idNews);


}


module.exports.deleteComment = async function (req, res) {
	var idNews = req.params.id;
	var idCommenter = req.body.idCommenter;

	var news = await Tinmoi.findOne({id: idNews})

	var theloaihientai = news.theloai;
	var theloai = await Theloai.findOne({_id: "5ed51a3a31739358f02d0178"})
	var lengthTheloai = theloai[theloaihientai].length;

	// dslk có 3 phần chính
	// node
	function DoublyLinkedListNode(idNews, idCommenter) {
		this.idNews = idNews;
		this.idCommenter = idCommenter;
		this.next = null;
		this.prev = null;
	}
	// danh sach
	function DoublyLinkedList() {
		this.head = null;
		this.tail = null;
		this.size = 0;
	}

	DoublyLinkedList.prototype.isEmpty = function() {
		return this.size == 0;
	}
	// các hàm
	DoublyLinkedList.prototype.addLast = function (idNews, idCommenter) {
		if (this.tail === null) {
			this.tail = new DoublyLinkedListNode(idNews, idCommenter);
			this.head = this.tail;

			// xoa ben tableTinmoi
			for (var i = 0; i < news.comment.length; i ++) {
				// tìm kiếm comment muốn xóa
				if (news.comment[i].idCommenter == idCommenter) {
					news.comment.splice(i, 1)
					news.markModified("comment")  // cú pháp xác định đối tượng cần thao tác 
					news.save()
					break;
				}
			}
			
			// xoa ben tableTheloai
			for (var i = 0; i < lengthTheloai; i ++) {
				// tìm ra bài viết chứa comment
				if (theloai[theloaihientai][i].id == idNews) {
					for (var j = 0; j < theloai[theloaihientai][i].comment.length; j ++) {
						// lặp qua các comment để tim comment cần xóa
						if (theloai[theloaihientai][i].comment[j].idCommenter == idCommenter) {											

							theloai[theloaihientai][i].comment.splice(j, 1);  // bo di 1 ptu tai vitri j
							
							// dùng markModified để xác định field nào đang thay đổi (cú pháp sửa database)
							theloai.markModified(theloaihientai)
							theloai.save()
							break;

						}
					}
				}
			}
		} 
	}

	var dll = new DoublyLinkedList()
	dll.addLast(idNews, idCommenter);
	res.redirect("/trangchu/tin-tuc-hot/" + idNews);

}


module.exports.updateNews = async function (req, res) {
	// lay du lieu tu front-end
	var idTableTheloai  = "5ed51a3a31739358f02d0178"
	var idNews = req.params.id
	var title = req.body.title
	var content = req.body.content
	var hashtag = req.body.hashtag
	var theloai = req.body.theloai
	var theloaihientai = req.body.theloaihientai
	var trangthai = req.body.trangthai
	var source = req.body.source
	var thoigianhientai = req.body.thoigianhientai
	var ngaythanghientai = req.body.ngaythanghientai
	var commenthientai = JSON.parse(req.body.commenthientai)
	var chinhsuahientai = JSON.parse(req.body.chinhsuahientai)
	var adminId = req.signedCookies.adminId
	var adminObject = await Admin.findOne({_id: adminId})
	var nguoichinhsua = adminObject.name
	// kiểm tra firstNews có được tích ko
	var firstNews = req.body.firstNews
	if (req.body.firstNews == "on") {
		firstNews = "true"
	} else {
		firstNews = "false"
	}

	// tạo thời gian
	var d = new Date();
	var date = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
	var time = d.getHours() + ":" + d.getMinutes();

	// kierm tra file là ảnh hay video
	var	imagePath 
	var	videoPath
	var uploads = req.files;
	for (var upload of uploads ) {
		if (upload.mimetype == "video/mp4") {
			videoPath = upload.path.split('/').slice(1).join('/')
		} else {
			imagePath = upload.path.split('/').slice(1).join('/')
		}
	}
	// tạo danh sách liên kết 
	function DoublyLinkedListNode(title, content, hashtag, imagePath, videoPath, theloai, firstNews, trangthai, thoigian, ngaythang, source) {
		this.title = title;
		this.content = content;
		this.hashtag = hashtag;
		this.image = imagePath;
		this.video = videoPath;
		this.theloai = theloai;
		this.firstNews = firstNews;
		this.trangthai = trangthai; 
		this.chinhsua = "ngày: " + ngaythang + " vào lúc: " + thoigian + " nguoichinhsua: " + nguoichinhsua
		this.source = source;
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

	DoublyLinkedList.prototype.addFirst = function (title, content, hashtag, imagePath, videoPath, theloai, firstNews, trangthai, thoigian, ngaythang, source) {

		if (this.head === null) {
			this.head = new DoublyLinkedListNode(title, content, hashtag, imagePath, videoPath, theloai, firstNews, trangthai, thoigian, ngaythang, source);
			this.tail = this.head;
		} else {
			var temp = new DoublyLinkedListNode(title, content, hashtag, imagePath, videoPath, theloai, firstNews, trangthai, thoigian, ngaythang, source);
			temp.next = this.head;
			this.head.prev = temp;
			this.head = temp;
		}
		this.size++;

	}

	DoublyLinkedList.prototype.addLast = function (title, content, hashtag, imagePath, videoPath, theloai, firstNews, trangthai, thoigian, ngaythang, source) {
		if (this.tail === null) {
			this.tail = new DoublyLinkedListNode(title, content, hashtag, imagePath, videoPath, theloai, firstNews, trangthai, thoigian, ngaythang, source);
			this.head = this.tail;
		} else {
			var temp = new DoublyLinkedListNode(title, content, hashtag, imagePath, videoPath, theloai, firstNews, trangthai, thoigian, ngaythang, source);
			this.tail.next = temp;
			temp.prev = this.tail;
			this.tail = temp;
		}
		this.size++;
	}




	// tạo ra 2 danh sách liên kết
	var listTheloai = new DoublyLinkedList()
	var listTinmoi = new DoublyLinkedList()

	// nếu tồn lại ảnh thì cho video = null và ngược lại
	if (imagePath) {
		// luu vao danh sach lien ket Theloai va dslk Tinmoi
		listTheloai.addLast(title, content, hashtag, imagePath, null, theloai, firstNews, trangthai, time, date, source );
		listTinmoi.addLast(title, content, hashtag, imagePath, null, theloai, firstNews, trangthai, time, date, source );

		// tim kiem trong data base
		var tableTheloai = await Theloai.findOne({ _id: idTableTheloai });
		var tableTinmoi = await Tinmoi.findOne({id: idNews});

		// cập nhật vào database tin moi
		for (var node = listTinmoi.head; node != null; node = node.next) {
			await tableTinmoi.updateOne({
				title: node.title,
				content: node.content,
				hashtag: node.hashtag,
				image: node.image,
				video: node.video,
				theloai: node.theloai,
				firstNews: node.firstNews,
				trangthai: node.trangthai,
				source: node.source
			})
			tableTinmoi.chinhsua.push(node.chinhsua)
			tableTinmoi.save()

			// cập nhật vào tableTheloai 
			// llặp qua thể loại hiện tại
			for (var i = 0; i < tableTheloai[theloaihientai].length; i ++) {
				// nếu thể loại hiện tại không thay đổi thì cập nhật 
				if (theloaihientai === theloai) {
					if (tableTheloai[theloaihientai][i].id === idNews) {
						tableTheloai[theloaihientai][i].title = node.title
						tableTheloai[theloaihientai][i].content = node.content
						tableTheloai[theloaihientai][i].hashtag = node.hashtag
						tableTheloai[theloaihientai][i].image = node.image
						tableTheloai[theloaihientai][i].video = node.video
						tableTheloai[theloaihientai][i].theloai = node.theloai
						tableTheloai[theloaihientai][i].firstNews = node.firstNews
						tableTheloai[theloaihientai][i].trangthai = node.trangthai
						tableTheloai[theloaihientai][i].source = node.source
						
						tableTheloai[theloaihientai][i].chinhsua.push(node.chinhsua)
						tableTheloai.markModified(theloaihientai)  // xác định đúng thể loại can luu
						tableTheloai.save()

					}
				// nếu thay đổi thì tạo thông tin mới bên thể loại mới và xóa thông tin cũ
				} else {
					tableTheloai[theloai].push({
						id: idNews,
						title: node.title,
						content: node.content,
						hashtag: node.hashtag,
						image: node.image,
						video: node.video,
						theloai: node.theloai,
						firstNews: node.firstNews,
						trangthai: node.trangthai,
						thoigian: thoigianhientai,
						ngaythang: ngaythanghientai,
						source: node.source,
						comment: commenthientai,
						chinhsua: chinhsuahientai
					})
					tableTheloai.markModified(theloai)
					var lastIndexOfTheLoai = tableTheloai[theloai].length - 1;
					// tạo thông tin mới
					tableTheloai[theloai][lastIndexOfTheLoai].chinhsua.push(node.chinhsua)
					// xóa thông tin cũ (bỏ đi 1 phần tử từ vị trí i)
					for (var i = 0; i < tableTheloai[theloaihientai].length; i ++) {
						if (tableTheloai[theloaihientai][i].id === idNews) {
							tableTheloai[theloaihientai].splice(i, 1) 
							tableTheloai.save();
							break; 
						}
					}
						
					break;

				}
			}
			
		}





		res.redirect('/'+theloai+'/news/'+idNews)
	}

	if (videoPath) {
		// luu vao danh sach lien ket Theloai va dslk Tinmoi
		listTheloai.addLast(title, content, hashtag, null, videoPath, theloai, firstNews, trangthai, time, date, source );
		listTinmoi.addLast(title, content, hashtag, null, videoPath, theloai, firstNews, trangthai, time, date, source );

		// tim kiem trong data base
		var tableTheloai = await Theloai.findOne({ _id: idTableTheloai });
		var tableTinmoi = await Tinmoi.findOne({id: idNews});

		// cập nhật vào database tin moi
		for (var node = listTinmoi.head; node != null; node = node.next) {
			await tableTinmoi.updateOne({
				title: node.title,
				content: node.content,
				hashtag: node.hashtag,
				image: node.image,
				video: node.video,
				theloai: node.theloai,
				firstNews: node.firstNews,
				trangthai: node.trangthai,
				source: node.source
			})
			tableTinmoi.chinhsua.push(node.chinhsua)
			tableTinmoi.save()

			// cập nhật vào tableTheloai 
			// llặp qua thể loại hiện tại
			for (var i = 0; i < tableTheloai[theloaihientai].length; i ++) {
				// nếu thể loại hiện tại không thay đổi thì cập nhật 
				if (theloaihientai === theloai) {
					if (tableTheloai[theloaihientai][i].id === idNews) {
						tableTheloai[theloaihientai][i].title = node.title
						tableTheloai[theloaihientai][i].content = node.content
						tableTheloai[theloaihientai][i].hashtag = node.hashtag
						tableTheloai[theloaihientai][i].image = node.image
						tableTheloai[theloaihientai][i].video = node.video
						tableTheloai[theloaihientai][i].theloai = node.theloai
						tableTheloai[theloaihientai][i].firstNews = node.firstNews
						tableTheloai[theloaihientai][i].trangthai = node.trangthai
						tableTheloai[theloaihientai][i].source = node.source
						
						tableTheloai[theloaihientai][i].chinhsua.push(node.chinhsua)
						tableTheloai.markModified(theloaihientai)  // xác định đúng thể loại can luu
						tableTheloai.save()

					}
				// nếu thay đổi thì tạo thông tin mới bên thể loại mới và xóa thông tin cũ
				} else {
					tableTheloai[theloai].push({
						id: idNews,
						title: node.title,
						content: node.content,
						hashtag: node.hashtag,
						image: node.image,
						video: node.video,
						theloai: node.theloai,
						firstNews: node.firstNews,
						trangthai: node.trangthai,
						thoigian: thoigianhientai,
						ngaythang: ngaythanghientai,
						source: node.source,
						comment: commenthientai,
						chinhsua: chinhsuahientai
					})
					tableTheloai.markModified(theloai)
					var lastIndexOfTheLoai = tableTheloai[theloai].length - 1;
					// tạo thông tin mới
					tableTheloai[theloai][lastIndexOfTheLoai].chinhsua.push(node.chinhsua)
					// xóa thông tin cũ (bỏ đi 1 phần tử từ vị trí i)
					for (var i = 0; i < tableTheloai[theloaihientai].length; i ++) {
						if (tableTheloai[theloaihientai][i].id === idNews) {
							tableTheloai[theloaihientai].splice(i, 1) 
							tableTheloai.save();
							break; 
						}
					}
						
					break;

				}
			}
			
		}





		res.redirect('/'+theloai+'/news/'+idNews)
	}

}

module.exports.deleteNews = async function (req, res) {
	var idTheloai = "5ed51a3a31739358f02d0178"
	var theloai = req.body.theloai
	var idNews = req.params.id;
	var objId = req.body.objId;

	function DoublyLinkedListNode (idTheloai, theloai, idNews, objId) {
		this.idTheloai = idTheloai;
		this.theloai = theloai;
		this.idNews = idNews;
		this.objId = objId;
		this.next = null;
		this.prev = null;

	}

	function DoublyLinkedList() {
		this.head = null;
		this.tail = null;
		this.size = 0;
	}


	DoublyLinkedList.prototype.addLast = async function (idTheloai, theloai, idNews, objId) {
		if (this.tail === null) {
			this.tail = new DoublyLinkedListNode(idTheloai, theloai, idNews, objId);
			this.head = this.tail;

			// lấy được id thì tìm trong database
			var tableTinmoi = await Tinmoi.findOne({_id: this.head.objId})
			var tableTheloai = await Theloai.findOne({_id: this.head.idTheloai})
			// xóa trong tin mới
			await tableTinmoi.deleteOne()

			for (var i = 0; i < tableTheloai[this.head.theloai].length; i ++) {
				if (tableTheloai[this.head.theloai][i].id === this.head.idNews) {
					tableTheloai[this.head.theloai].splice(i, 1)  // remove 1 phan tử từ vị trí thứ i
					tableTheloai.save()
					break;
				}
			}
			res.redirect("/trangchu");


		} else {
			var temp = new DoublyLinkedListNode(idTheloai, theloai, idNews, objId);
			this.tail.next = temp;
			temp.prev = this.tail;
			this.tail = temp;
		}
		this.size++;
	}


	var list = new DoublyLinkedList()
	list.addLast(idTheloai, theloai, idNews, objId)


	// // lấy được id thì tìm
	// var tableTinmoi = await Tinmoi.findOne({_id: objId})
	// var tableTheloai = await Theloai.findOne({_id: idTheloai})
	// // xóa trong tin mới
	// await tableTinmoi.deleteOne()


	// xóa trong thể loại
	
}