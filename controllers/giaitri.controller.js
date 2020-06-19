var Tinmoi = require('../models/tinmoi.model.js')
var Theloai = require('../models/theloai.model.js')
var Session = require('../models/session.model.js')


module.exports.getIndex = async function (req, res) {
	var tinmoi = await Tinmoi.find();
	var theloai = await Theloai.findOne({_id: "5ed51a3a31739358f02d0178"})

	function DoublyLinkedListNode(theloai) {
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
	DoublyLinkedList.prototype.addFirst = function (theloai){
		if (this.head === null) {
			this.head = new DoublyLinkedListNode(theloai)
			this.tail = this.head;
		} else {
			var temp = new DoublyLinkedListNode(theloai)
			temp.next = this.head;
			this.head.prev = temp;
			this.head = temp;
		}
		this.size++;

	}

	var listtheloai = new DoublyLinkedList()
	listtheloai.addFirst(theloai)

	
	for (var node = listtheloai.head; node != null; node = node.next) { 
		res.render('theloai/giaitri.pug', {
			theloais: node.theloai
		})
		return;
	}

	// res.render('theloai/giaitri.pug', {
	// 	tinmois: tinmoi,  // node.tinmoi
	// 	theloais: theloai  // node.theloai
	// })
}