var Admin = require("../models/admin.model.js")
module.exports.requireAuth = function (req, res, next) {

	var adId = req.signedCookies.adminId;

	function DoublyLinkedListNode(adId){
		this.adId = adId;
		this.next = null;
		this.prev = null;
	}

	function DoublyLinkedList(){
		this.head = null;
		this.tail = null;
		this.size = 0;
	}

	DoublyLinkedList.prototype.isEmpty = function() {
		return this.size == 0;
	}

	DoublyLinkedList.prototype.addLast = function (adId) {
		if (this.tail === null) {
			this.tail = new DoublyLinkedListNode(adId);
			this.head = this.tail;
		} else {
			var temp = new DoublyLinkedListNode(adId);
			this.tail.next = temp;
			temp.prev = this.tail;
			this.tail = temp;
		}
		this.size++;
	}
	var listCookie = new DoublyLinkedList()

	listCookie.addLast(adId)
	// trong database lưu vào dslk đôi
	for (var node = listCookie.head; node != null; node = node.next) {   // cú pháp lặp qua dslk
		
		if (!node.adId) {
			res.redirect('/admin/login');
			return
		}	 

		Admin.find({ _id: node.adId })
			.then(function(userCookie) {
				res.locals.user = userCookie;
				next();
			})
			.catch(function(err) {
				res.redirect('/auth/login');
			})
	}


	

	// var userCookie = db.get('users').find({ id: req.signedCookies.userId }).value(); 

	// if (!userCookie) {
	// 	res.redirect('/auth/login');
	// 	return
	// }

	// res.locals.user = userCookie;
	
	// next();d

}