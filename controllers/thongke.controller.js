var Session = require('../models/session.model.js')
var Tinmoi = require('../models/tinmoi.model.js')

module.exports.getStatistic = async function (req, res) {
	var sessionTable = await Session.find()
	var tinmoiTable = await Tinmoi.find()

	function DoublyLinkedListNode(sessionId, date, time , theloaidaxem, theloai) {
		this.sessionId = sessionId
		this.theloaidaxem = theloaidaxem
		this.theloai = theloai
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

	DoublyLinkedList.prototype.addFirst = function (sessionId, date, time, theloaidaxem, theloai ) {
		if (this.head === null) {
			this.head = new DoublyLinkedListNode(sessionId, date, time, theloaidaxem, theloai );
			this.tail = this.head;
		} else {
			var temp = new DoublyLinkedListNode(sessionId, date, time, theloaidaxem, theloai );
			temp.next = this.head;
			this.head.prev = temp;
			this.head = temp;
		}
		this.size++;
	}

	DoublyLinkedList.prototype.addLast = function (sessionId, date, time, theloaidaxem, theloai ) {
		if (this.tail === null) {
			this.tail = new DoublyLinkedListNode(sessionId, date, time, theloaidaxem, theloai );
			this.head = this.tail;
		} else {
			var temp = new DoublyLinkedListNode(sessionId, date, time, theloaidaxem, theloai );
			this.tail.next = temp;
			temp.prev = this.tail;
			this.tail = temp;
		}
		this.size++;
	} 
	// tạo ra một danh sách liên kết
	var sessionList = new DoublyLinkedList();
	var tinmoiList = new DoublyLinkedList();
	var chinhsuaList = new DoublyLinkedList()

	// lặp qua sessionTable và lưu vào dslk
	for (data of sessionTable) {
		sessionList.addLast(data.id, data.date, data.time, data.theloaidaxem)
	}

	// lặp qua tinmoi và lưu vào dslk
	for (data of tinmoiTable) {
		tinmoiList.addFirst(data.id, data.ngaythang, data.thoigian, data.comment, data.theloai)
		chinhsuaList.addFirst(data.id, data.ngaythang, data.thoigian, data.chinhsua, data.theloai)
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

	var  countChinhsua= {};
	for (var node = chinhsuaList.head; node != null; node = node.next) {
		for (element of node.theloaidaxem) {
			if (element) {
				var time = element.split(" ")[1]
				var month = element.split(" ")[1].split("/")[1]
				if (!countChinhsua[month]) {
					countChinhsua[month] = {time} 
					countChinhsua[month][time] = (countChinhsua[month][time] || 0) + 1	
				} else {
					countChinhsua[month][time] = (countChinhsua[month][time] || 0) + 1	
				}
			}
		}
	}
	// // sap xep ngay theo thu tu tang dan
	// 	labels.sort(function (a, b) {
	// 		var date1 = a.split("/")[0]
	// 		var date2 = b.split("/")[0]
	// 		return date1 - date2
	// 	})

	// lấy tất thể loại đã xem
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

	// lấy tất cả comment theo tháng
	var allComment = {}
	getAllComment(allComment)

	function getAllComment(obj) {
		for (var i = 1; i < 13; i ++) {
			for (var node = tinmoiList.head; node != null; node = node.next) {
				var month = JSON.parse(node.date.split("/")[1])
				if (month == i) {
					for (data of node.theloaidaxem) {
						// nếu không tồn tại thì tạo mới
						if (!obj[month]) {
							obj[month] = [data]
							// obj[month][obj[month].length-1].theloai = node.theloai 
							for (key in countChinhsua) {
								if (key == month) {
									obj[month].push({ngaychinhsua: countChinhsua[key]})				
								}
							}
						} else {
							obj[month].push(data)
						}
					}
				}
			}
		}
	}

	// lấy tất cả tin đã chỉnh sửa 

	var allChinhsua = {}
	getAllChinhsua(allChinhsua)

	function getAllChinhsua(obj) {
		for (var i = 1; i < 13; i ++) {
			for (var node = chinhsuaList.head; node != null; node = node.next) {
				var month = JSON.parse(node.date.split("/")[1])
				if (month == i) {
					for (data of node.theloaidaxem) {
						// nếu không tồn tại thì tạo mới
						if (!obj[month]) {
							obj[month] = [{
								thoigianchinhsua: data,
								id: node.sessionId,
								theloai: node.theloai
							}] 
						} else {
							obj[month].push({
								thoigianchinhsua: data,
								id: node.sessionId,
								theloai: node.theloai
							})
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

	// danh sach lien ket thu 2
	function DoublyLinkedListSessionNode(data) {
		this.data = data
	}

	function DoublyLinkedListSession() {
		this.head = null;
		this.tail = null;
		this.size = 0;
		
	}

	DoublyLinkedListSession.prototype.addLast = function (data) {
		if (this.tail === null) {
			this.tail = new DoublyLinkedListSessionNode(data);
			this.head = this.tail;
		} else {
			var temp = new DoublyLinkedListSessionNode(data);
			this.tail.next = temp;
			temp.prev = this.tail;
			this.tail = temp;
		}
		this.size++;
	} 

	var listSession = new DoublyLinkedListSession()

	for (element of sessionTable) {
		if (element.baivietdaxem[0]) {
			for (item of element.baivietdaxem) {
				listSession.addLast(item)
			}
		}
	}

	var seenNewsMonth1 = []
	var seenNewsMonth2 = []
	var seenNewsMonth3 = []
	var seenNewsMonth4 = []
	var seenNewsMonth5 = []
	var seenNewsMonth6 = []
	var seenNewsMonth7 = []
	var seenNewsMonth8 = []
	var seenNewsMonth9 = []
	var seenNewsMonth10 = []
	var seenNewsMonth11 = []
	var seenNewsMonth12 = []



	for (var node = listSession.head; node != null; node = node.next) {
		switch(node.data.date.split("/")[1]) {
			case '1': 
				seenNewsMonth1.push(node.data)
				break
			case '2': 
				seenNewsMonth2.push(node.data)
				break
			case '3': 
				seenNewsMonth3.push(node.data)
				break
			case '4': 
				seenNewsMonth4.push(node.data)
				break
			case '5': 
				seenNewsMonth5.push(node.data)
				break
			case '6': 
				seenNewsMonth6.push(node.data)
				break
			case '7': 
				seenNewsMonth7.push(node.data)
				break
			case '8': 
				seenNewsMonth8.push(node.data)
				break
			case '9': 
				seenNewsMonth9.push(node.data)
				break
			case '10': 
				seenNewsMonth10.push(node.data)
				break
			case '11': 
				seenNewsMonth11.push(node.data)
				break
			case '12': 
				seenNewsMonth12.push(node.data)
				break
		}	
	}	

	// keysSorted = Object.keys(countId).sort(function(a,b){
	//   return countId[b]-countId[a]
	// })

	var allSeenNews = []
	var theNumberOfSeenNews = []
	var dataSeenNews = []

	countIdMonth(seenNewsMonth1)
	countIdMonth(seenNewsMonth2)
	countIdMonth(seenNewsMonth3)
	countIdMonth(seenNewsMonth4)
	countIdMonth(seenNewsMonth5)
	countIdMonth(seenNewsMonth6)
	countIdMonth(seenNewsMonth7)
	countIdMonth(seenNewsMonth8)
	countIdMonth(seenNewsMonth9)
	countIdMonth(seenNewsMonth10)
	countIdMonth(seenNewsMonth11)
	countIdMonth(seenNewsMonth12)

	// ssắp xếp bài viết, lọc ra số lần xem của bài viết
	async function countIdMonth(seenNewsMonth) {
		var countMonth = {}
		for (element of seenNewsMonth) {
		  countMonth[element.id] = (countMonth[element.id] || 0) + 1
		}
		// sap xep key theo thu tu tang dan
		keysSorted = Object.keys(countMonth).sort(function(a, b) {
	      return countMonth[b] - countMonth[a]
	    })
		// //slice object
		// const sliced = Object.keys(keysSorted).slice(0, 10).reduce((result, key) => {
		//     result[key] = countMonth[key];

		//     return result;
		// }, {});




		// lọc ra số lần xem của 10 bài viết
		var tempValue = []
		if (keysSorted.length !== 0) {
			for (element of keysSorted) {
				tempValue.push(countMonth[element])
			}
			theNumberOfSeenNews.push(tempValue.slice(0, 10))
		} else {
			theNumberOfSeenNews.push([])
		}

		// lọc ra id của 10 bài viết 
		var sliced = keysSorted.slice(0, 10)
		allSeenNews.push(sliced)
	}

	// var allSeenNewsSorted = sortKey(JSON.stringify(allSeenNews))
	// function sortKey(allSeenNews) {
	// 	var tempSorted = JSON.parse(allSeenNews)
	// 	for (var i = 0; i < tempSorted.length; i ++) {
	// 		if (Object.keys(tempSorted[i]).length !== 0) {
	// 			tempSorted[i] = Object.keys(tempSorted[i]).sort(function(a, b) {
	// 		      return tempSorted[i][b] - tempSorted[i][a]
	// 		    })
	// 			tempSorted[i] = tempSorted[i].slice(0, 10)
	// 		}
	// 	}
	// 	return tempSorted
	// }

	// dùng async function thì phải sử lí bất đồng bộ bằng cách dùng function như tham số
	var tempArr = async function (dataSeenNews) {
		for (var i = 0; i < allSeenNews.length; i ++) {
			if (Object.keys(allSeenNews[i]).length !== 0) {
				var data = []
				for (elemt of allSeenNews[i]) {
					data.push(await Tinmoi.findOne({id: elemt}))
				}
				dataSeenNews[i] = data
				// dataSeenNews[i] = dataSeenNews[i].slice(0, 10)
			} else {
				dataSeenNews[i] = {}
			}
		}
		return dataSeenNews

	}

	var dataNews = await tempArr(dataSeenNews)





	// console.log(await tempArr(dataSeenNews))
	// console.log(allSeenNews)
	// console.log(slice10.length)
	res.render("thongke/index.pug", {
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

		theloaidaxem: theloaidaxem,

		allComment: allComment,

		allChinhsua: allChinhsua,

		allSeenNews: theNumberOfSeenNews,

		dataHadSeen: dataNews
	})
}