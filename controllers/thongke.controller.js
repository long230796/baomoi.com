var Session = require('../models/session.model.js')
var Tinmoi = require('../models/tinmoi.model.js')

module.exports.getStatistic = async function (req, res) {
	var sessionTable = await Session.find()
	var tinmoiTable = await Tinmoi.find()

	function DoublyLinkedListNode(sessionId, date, time , theloaidaxem) {
		this.sessionId = sessionId
		this.theloaidaxem = theloaidaxem
		this.date = date
		this.time = time
		this.next = null;
		this.prev = null;
	}

	function DoublyLinkedList() {
		this.head = null;
		this.tail = null;
		this.size = 0;
		
	}

	// DoublyLinkedList.prototype.isEmpty = function() {
	// 	return this.size == 0;
	// }

	DoublyLinkedList.prototype.addFirst = function (sessionId, date, time, theloaidaxem ) {
		if (this.head === null) {
			this.head = new DoublyLinkedListNode(sessionId, date, time, theloaidaxem );
			this.tail = this.head;
		} else {
			var temp = new DoublyLinkedListNode(sessionId, date, time, theloaidaxem );
			temp.next = this.head;
			this.head.prev = temp;
			this.head = temp;
		}
		this.size++;
	}

	DoublyLinkedList.prototype.addLast = function (sessionId, date, time, theloaidaxem ) {
		if (this.tail === null) {
			this.tail = new DoublyLinkedListNode(sessionId, date, time, theloaidaxem );
			this.head = this.tail;
		} else {
			var temp = new DoublyLinkedListNode(sessionId, date, time, theloaidaxem );
			this.tail.next = temp;
			temp.prev = this.tail;
			this.tail = temp;
		}
		this.size++;
	} 
	// tạo ra một danh sách liên kết
	var sessionList = new DoublyLinkedList();
	var tinmoiList = new DoublyLinkedList();

	// lặp qua sessionTable và lưu vào dslk
	for (data of sessionTable) {
		sessionList.addLast(data.id, data.date, data.time, data.theloaidaxem)
	}

	// lặp qua tinmoi và lưu vào dslk
	for (data of tinmoiTable) {
		tinmoiList.addFirst(data.id, data.ngaythang, data.thoigian, data.comment)
	}

	// đếm số tháng trùng nhau của sessionTable
	var countSession = {};
	for (var node = sessionList.head; node != null; node = node.next) {
		countSession[node.date] = (countSession[node.date] || 0) + 1
	}
	// sessionTable.forEach(function(x) { 
	//   countSession[x.date] = (countSession[x.date] || 0)+1; 
	// });

	// đếm số tháng trùng nhau của tinmoiTable
	var  countTinmoi= {};
	for (var node = tinmoiList.head; node != null; node = node.next) {
		countTinmoi[node.date] = (countTinmoi[node.date] || 0) + 1
	}

	// // lấy tất thể loại đã xem
	var theloaidaxem = {}
	getCategoryByMonth(theloaidaxem)

	function getCategoryByMonth(obj) {
		for (var i = 1; i < 13; i ++) {
			for (var node = sessionList.head; node != null; node = node.next) {
				var month = JSON.parse(node.date.split("/")[1])
				if (month == i) {
					for (data of node.theloaidaxem) {
						// nếu không tồn tại thì tạo mới
						if (!obj[month]) {
							obj[month] = [data] 
						} else {
							obj[month].push(data)
						}
					}
				}
			}
		}
	}


	
	
	

	var sessionMonth1 = [] ;
	var sessionMonth2 = [] ;
	var sessionMonth3 = [] ;
	var sessionMonth4 = [] ;
	var sessionMonth5 = [] ;
	var sessionMonth6 = [] ;
	var sessionMonth7 = [] ;
	var sessionMonth8 = [] ;
	var sessionMonth9 = [] ;
	var sessionMonth10 = [] ;
	var sessionMonth11 = [] ;
	var sessionMonth12 = [] ;

	var newsMonth1 = [] ;
	var newsMonth2 = [] ;
	var newsMonth3 = [] ;
	var newsMonth4 = [] ;
	var newsMonth5 = [] ;
	var newsMonth6 = [] ;
	var newsMonth7 = [] ;
	var newsMonth8 = [] ;
	var newsMonth9 = [] ;
	var newsMonth10 = [] ;
	var newsMonth11 = [] ;
	var newsMonth12 = [] ;


	arrayContainObject(countSession, sessionMonth1, sessionMonth2, sessionMonth3, sessionMonth4, sessionMonth5, sessionMonth6, sessionMonth7, sessionMonth8, sessionMonth9, sessionMonth10, sessionMonth11, sessionMonth12)
	arrayContainObject(countTinmoi, newsMonth1, newsMonth2, newsMonth3, newsMonth4, newsMonth5, newsMonth6, newsMonth7, newsMonth8, newsMonth9, newsMonth10, newsMonth11, newsMonth12)



	function arrayContainObject(counts, month1, month2, month3, month4, month5, month6, month7, month8, month9, month10, month11, month12) {
		for (count in counts) {
			// var obj = {}
			// obj[count] = counts[count]
			// arraySession.push(obj)
			var stringMonth = count.split("/")[1]
			switch (stringMonth) {
				case "1":
					month1.push({[count]: counts[count]})
					break;
				case "2":
					month2.push({[count]: counts[count]})
					break;
				case "3":
					month3.push({[count]: counts[count]})
					break;
				case "4":
					month4.push({[count]: counts[count]})
					break;
				case "5":
					month5.push({[count]: counts[count]})
					break;
				case "6":
					month6.push({[count]: counts[count]})
					break;
				case "7":
					month7.push({[count]: counts[count]})
					break;
				case "8":
					month8.push({[count]: counts[count]})
					break;
				case "9":
					month9.push({[count]: counts[count]})
					break;
				case "10":
					month10.push({[count]: counts[count]})
					break;
				case "11":
					month11.push({[count]: counts[count]})
					break;
				case "12":
					month12.push({[count]: counts[count]})
					break;
			}
		}

	}

	console.log(tinmoiList)
	res.render("mdb/index.pug", {
		sessionMonth1: sessionMonth1,
		sessionMonth2: sessionMonth2,
		sessionMonth3: sessionMonth3,
		sessionMonth4: sessionMonth4,
		sessionMonth5: sessionMonth5,
		sessionMonth6: sessionMonth6,
		sessionMonth7: sessionMonth7,
		sessionMonth8: sessionMonth8,
		sessionMonth9: sessionMonth9,
		sessionMonth10: sessionMonth10,
		sessionMonth11: sessionMonth11,
		sessionMonth12: sessionMonth12,

		newsMonth1: newsMonth1,
		newsMonth2: newsMonth2,
		newsMonth3: newsMonth3,
		newsMonth4: newsMonth4,
		newsMonth5: newsMonth5,
		newsMonth6: newsMonth6,
		newsMonth7: newsMonth7,
		newsMonth8: newsMonth8,
		newsMonth9: newsMonth9,
		newsMonth10: newsMonth10,
		newsMonth11: newsMonth11,
		newsMonth12: newsMonth12,

		theloaidaxem: theloaidaxem
	})
}