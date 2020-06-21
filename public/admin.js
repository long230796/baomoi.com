// nhiem vu ngay mai: fix require image update vs fix subUpdate
// window.onbeforeunload = function() {
// 	return document.cookie = "userId=''; path=/"
// }
// script nhập bài viết hoặc thêm bài viết
function displayInputForm() {
// enable inputForm
	if (document.getElementsByClassName("disable-title")[0]) {
		document.getElementsByClassName("disable-title")[0].setAttribute("class", "title form-control")
		document.getElementsByClassName("disable-content")[0].setAttribute("class", "content form-control mb-2")
		document.getElementsByClassName("disable-addImage")[0].setAttribute("class", "addImage custom-file-input")
		document.getElementsByClassName("disable-hashtag")[0].setAttribute("class", "hashtag form-control")
		document.getElementsByClassName("disable-theloai")[0].setAttribute("class", "theloai ml-2")
		document.getElementsByClassName("disable-check")[0].setAttribute("class", "check ml-2")
		document.getElementsByClassName("disable-trangthai")[0].setAttribute("class", "trangthai ml-2")
		document.getElementsByClassName("disable-add-btn")[0].setAttribute("class", "add-btn btn btn-primary mb-3 mr-2")
		document.getElementsByClassName("disable-preview-btn")[0].setAttribute("class", "preview-btn btn btn-primary mb-3 mr-2")
		// target alert 
		document.getElementsByClassName('disable-titleAlert')[0].setAttribute("class", "alert alert-danger titleAlert")
		document.getElementsByClassName('disable-contentAlert')[0].setAttribute("class", "alert alert-danger contentAlert")
		document.getElementsByClassName('disable-imageAlert')[0].setAttribute("class", "alert alert-danger imageAlert")
		document.getElementsByClassName('disable-hashtagAlert')[0].setAttribute("class", "alert alert-danger hashtagAlert")	
	}



	// disable addForm
	document.getElementsByClassName("title")[1].setAttribute("class", "disable-title")
	document.getElementsByClassName("content")[1].setAttribute("class", "disable-content")
	document.getElementsByClassName("addImage")[1].setAttribute("class", "disable-addImage")
	document.getElementsByClassName("hashtag")[1].setAttribute("class", "disable-hashtag")
	document.getElementsByClassName("theloai")[1].setAttribute("class", "disable-theloai")
	document.getElementsByClassName("check")[1].setAttribute("class", "disable-check")
	document.getElementsByClassName("trangthai")[1].setAttribute("class", "disable-trangthai")
	document.getElementsByClassName("add-btn")[1].setAttribute("class", "disable-add-btn")
	document.getElementsByClassName("preview-btn")[1].setAttribute("class", "disable-preview-btn")
	// target alert 
	document.getElementsByClassName('titleAlert')[1].setAttribute("class", "disable-titleAlert")
	document.getElementsByClassName('contentAlert')[1].setAttribute("class", "disable-contentAlert")
	document.getElementsByClassName('imageAlert')[1].setAttribute("class", "disable-imageAlert")
	document.getElementsByClassName('hashtagAlert')[1].setAttribute("class", "disable-hashtagAlert")
	//display form
	document.getElementById("form-input").style.display = "block"
	document.getElementById("form-add").style.display = "none"
}

function displayAddForm() {
	// enable inputForm
	if (document.getElementsByClassName("disable-title")[0]) {
		document.getElementsByClassName("disable-title")[0].setAttribute("class", "title form-control")
		document.getElementsByClassName("disable-content")[0].setAttribute("class", "content form-control mb-2")
		document.getElementsByClassName("disable-addImage")[0].setAttribute("class", "addImage custom-file-input")
		document.getElementsByClassName("disable-hashtag")[0].setAttribute("class", "hashtag form-control")
		document.getElementsByClassName("disable-theloai")[0].setAttribute("class", "theloai ml-2")
		document.getElementsByClassName("disable-check")[0].setAttribute("class", "check ml-2")
		document.getElementsByClassName("disable-trangthai")[0].setAttribute("class", "trangthai ml-2")
		document.getElementsByClassName("disable-add-btn")[0].setAttribute("class", "add-btn btn btn-primary mb-3 mr-2")
		document.getElementsByClassName("disable-preview-btn")[0].setAttribute("class", "preview-btn btn btn-primary mb-3 mr-2")

		// target alert
		document.getElementsByClassName('disable-titleAlert')[0].setAttribute("class", "alert alert-danger titleAlert")
		document.getElementsByClassName('disable-contentAlert')[0].setAttribute("class", "alert alert-danger contentAlert")
		document.getElementsByClassName('disable-imageAlert')[0].setAttribute("class", "alert alert-danger imageAlert")
		document.getElementsByClassName('disable-hashtagAlert')[0].setAttribute("class", "alert alert-danger hashtagAlert")	

	}


	// disable addForm
	document.getElementsByClassName("title")[0].setAttribute("class", "disable-title")
	document.getElementsByClassName("content")[0].setAttribute("class", "disable-content")
	document.getElementsByClassName("addImage")[0].setAttribute("class", "disable-addImage")
	document.getElementsByClassName("hashtag")[0].setAttribute("class", "disable-hashtag")
	document.getElementsByClassName("theloai")[0].setAttribute("class", "disable-theloai")
	document.getElementsByClassName("check")[0].setAttribute("class", "disable-check")
	document.getElementsByClassName("trangthai")[0].setAttribute("class", "disable-trangthai")
	document.getElementsByClassName("add-btn")[0].setAttribute("class", "disable-add-btn")
	document.getElementsByClassName("preview-btn")[0].setAttribute("class", "disable-preview-btn")
	// target alert 
	document.getElementsByClassName('titleAlert')[0].setAttribute("class", "disable-titleAlert")
	document.getElementsByClassName('contentAlert')[0].setAttribute("class", "disable-contentAlert")
	document.getElementsByClassName('imageAlert')[0].setAttribute("class", "disable-imageAlert")
	document.getElementsByClassName('hashtagAlert')[0].setAttribute("class", "disable-hashtagAlert")


	//display form
	document.getElementById("form-add").style.display = "block"
	document.getElementById("form-input").style.display = "none"
}



function scriptAddNews() {
	var title = document.getElementsByClassName("title")[0].value
	var content = document.getElementsByClassName("content")[0].value
	var addImage = document.getElementsByClassName("addImage")[0].value
	var hashtag = document.getElementsByClassName("hashtag")[0].value
	// target alert 
	var titleAlert = document.getElementsByClassName('titleAlert')[0]
	var contentAlert = document.getElementsByClassName('contentAlert')[0]
	var imageAlert = document.getElementsByClassName('imageAlert')[0]
	var hashtagAlert = document.getElementsByClassName('hashtagAlert')[0]


	if (!title || title.length <= 10) {
		titleAlert.style.display = "block"
	} else {
		titleAlert.style.display = "none"
	}

	if (!content || content.length <= 100) {
		contentAlert.style.display = "block"
	} else {
		contentAlert.style.display = "none"
	}

	if (!addImage) {
		imageAlert.style.display = "block"
	} else {
		imageAlert.style.display = "none"
	}

	if (!hashtag) {
		hashtagAlert.textContent = "Require hastag"
		hashtagAlert.style.display = "block"
	} else {
		if (hashtag.charAt(0) == "#") {
			hashtagAlert.style.display = "none"
		} else {
			hashtagAlert.style.display = "block"
			hashtagAlert.textContent = "Require # at first hashtag"

		}
	}

	
	if (title && content && hashtag.charAt(0) == "#" && addImage && title.length >= 10 && content.length >= 100) {
		var checkCode = prompt('please enter secret code', 'code here')
		if (checkCode != null) {
			if ( checkCode == "demo") {
			    var r = confirm("you want to add news");
			    if (r == true) {
					var addBtn = document.getElementsByClassName('add-btn')[0]
					addBtn.setAttribute("type", "submit")
					addBtn.removeAttribute("onclick")
					addBtn.click();
			    }
			} else {
			  alert("wrong password");
			}

		}
	}
	
}

function nameImage() {
	var nameImage = document.getElementsByClassName("addImage")[0].value;
	document.getElementsByClassName("nameImage")[0].textContent = nameImage;
}





// add data to localStorage to preview
//start global variable localStorage

	var storageKey = 'news';
    var dataString = localStorage.getItem(storageKey);
    var news;

    if (dataString) {
      news = JSON.parse(dataString);
    } else {
      news = [];
    }

//end global variable localstorage

    function addLocal() {
      // id
	var tieude = document.getElementsByClassName('title')[0]
	var noidung = document.getElementsByClassName('content')[0]
	var anh = document.getElementsByClassName("addImage")[0]
	var hashtags = document.getElementsByClassName("hashtag")[0]
	var theloai = document.getElementsByClassName('theloai')[0].value
	var checkbox = document.getElementsByClassName("check")[0].checked
	var trangthai = document.getElementsByClassName("trangthai")[0].value

	//get value
	var title = tieude.value;
	var content = noidung.value
	var addImage = anh.value
	var hashtag = hashtags.value

	var titleAlert = document.getElementsByClassName('titleAlert')[0]
	var contentAlert = document.getElementsByClassName('contentAlert')[0]
	var imageAlert = document.getElementsByClassName('imageAlert')[0]
	var hashtagAlert = document.getElementsByClassName('hashtagAlert')[0]


	if (!title) {
		titleAlert.style.display = "block"
	} else {
		titleAlert.style.display = "none"
	}

	if (!content) {
		contentAlert.style.display = "block"
	} else {
		contentAlert.style.display = "none"
	}

	if (!addImage) {
		imageAlert.style.display = "block"
	} else {
		imageAlert.style.display = "none"
	}

	if (!hashtag) {
		hashtagAlert.textContent = "Require hastag"
		hashtagAlert.style.display = "block"
	} else {
		if (hashtag.charAt(0) == "#") {
			hashtagAlert.style.display = "none"
		} else {
			hashtagAlert.style.display = "block"
			hashtagAlert.textContent = "Require # at first hashtag"

		}
	}
	if (title && content && hashtag.charAt(0) == "#" && addImage) {
      var newSpaper = {
        title: title,
        content: content,
        image: addImage,
        hashtag: hashtag,
        theloai: theloai,
        firstNews: checkbox,
        trangthai: trangthai
      }
      news.push(newSpaper);
      // re-render
      render();
      addEventDeleteUpdate();
      addEventSubUpdateCancel()
      // clear input
      tieude.value = '';
      noidung.value = '';
      anh.value = '';
      hashtags.value = '';
      // store data
      localStorage.setItem(storageKey, JSON.stringify(news));

	}
      // add to news array
    }

    function Delete(event) {
      var checkCode = prompt('please enter secret code', 'code here')
      if (checkCode != null) {
        if ( checkCode == "demo") {
            var r = confirm("you want to delete?");
            if (r == true) {
              var button = event.target;
              var i = parseInt(button.dataset.id);
              news.splice(i, 1);
              render();
              addEventDeleteUpdate();
              addEventSubUpdateCancel()
              localStorage.setItem(storageKey, JSON.stringify(news));
            }
        } else {
          alert("wrong password");
        }

      }
    }

    function update(event) {
      var button = event.target;
      var i = button.dataset.id;
      var formUpdate = i.replace("mainUpdate", "formUpdate");
      document.getElementById(formUpdate).style.display = "block"; 
    }

    function setValueUpdate(updateSelectId, tinhotUpdateId, trangthaiUpdateId, index) {   //id va index truyền từ hàm onlick của dropdownBtn
    	var i = index
    	var valueUpdateSelect = news[i].theloai
    	var valueTinhotUpdate = news[i].firstNews
    	var valueTrangThaiUpdate = news[i].trangthai
    	//using value to asign value 
    	updateSelectId.value = valueUpdateSelect
    	tinhotUpdateId.checked = valueTinhotUpdate
    	trangthaiUpdateId.value = valueTrangThaiUpdate
    }

    function addPreviewNews(event) {
    	var button = event.target;
    	var i = button.dataset.id;
    	// get id form update
    	var titleUpdateId = i.replace("addPreview", "titleupdate");
    	var contentUpdateId = i.replace("addPreview", "contentupdate");
    	var imageUpdateId = i.replace("addPreview", "imageupdate");
    	var hashtagUpdateId = i.replace("addPreview", "hashtagupdate");
    	var theloaiUpdateId = i.replace("addPreview", "updateSelect");
    	var tinhotUpdateId = i.replace("addPreview", "tinhotupdate");
    	var trangthaiUpdateId = i.replace("addPreview", "trangthaiupdate");


    	var title = document.getElementById(titleUpdateId).value;
    	var content = document.getElementById(contentUpdateId).value;
    	var image = document.getElementById(imageUpdateId).value;
    	var hashtag = document.getElementById(hashtagUpdateId).value;
    	var theloai = document.getElementById(theloaiUpdateId).value;
    	var firstNews = document.getElementById(tinhotUpdateId).checked;
    	var trangthai = document.getElementById(trangthaiUpdateId).value;

    	document.getElementsByClassName("title")[0].value=title;
    	document.getElementsByClassName("content")[0].value=content;
    	document.getElementsByClassName("hashtag")[0].value=hashtag;
    	document.getElementsByClassName("theloai")[0].value=theloai;
    	document.getElementsByClassName("check")[0].checked=firstNews;
    	document.getElementsByClassName("trangthai")[0].value=trangthai;
    	window.scrollTo(0, 0);


    	scriptAddNews()
    }

    function subUpdate(event) {
    	var button = event.target
    	var i = button.dataset.id
    	var specifiedIndex = i.slice(6);
    	// get id form
    	var titleId = i.replace("update", "titleupdate")
    	var contentId = i.replace("update", "contentupdate")
    	var imageId = i.replace("update", "imageupdate")
    	var hashtagId = i.replace("update", "hashtagupdate")
    	var theloaiId = i.replace("update", "updateSelect")
    	var firstNewsId = i.replace("update", "tinhotupdate")
    	var trangthaiId = i.replace("update", "trangthaiupdate")


    	// get Id alertUpdate
    	var titleAlertId = i.replace("update", "titleAlert")
    	var contentAlertId = i.replace("update", "contentAlert")
    	var imageAlertId = i.replace("update", "imageAlert")
    	var hashtagAlertId = i.replace("update", "hashtagAlert")

    	//get new value
    	var newTitle = document.getElementById(titleId).value
		var newContent = document.getElementById(contentId).value
		var newImage = document.getElementById(imageId).value
		var newHashtag = document.getElementById(hashtagId).value
		var newTheloai = document.getElementById(theloaiId).value
		var newFirstNews = document.getElementById(firstNewsId).checked
		var newTrangthai = document.getElementById(trangthaiId).value

		// alert Form
    	var titleAlert = document.getElementById(titleAlertId)
    	var contentAlert = document.getElementById(contentAlertId)
    	var imageAlert = document.getElementById(imageAlertId)
    	var hashtagAlert = document.getElementById(hashtagAlertId)
		


		if (!newTitle) {
			titleAlert.style.display = "block"
		} else {
			titleAlert.style.display = "none"
		}

		if (!newContent) {
			contentAlert.style.display = "block"
		} else {
			contentAlert.style.display = "none"
		}

		if (!newImage) {
			imageAlert.style.display = "block"
		} else {
			imageAlert.style.display = "none"
		}

		if (!newHashtag) {
			hashtagAlert.textContent = "Require hastag"
			hashtagAlert.style.display = "block"
		} else {
			if (newHashtag.charAt(0) == "#") {
				hashtagAlert.style.display = "none"
			} else {
				hashtagAlert.style.display = "block"
				hashtagAlert.textContent = "Require # at first hashtag"

			}
		}
		if (newTitle && newContent && newHashtag.charAt(0) == "#" && newImage) {

	      var checkCode = prompt('please enter secret code', 'code here')
	      if (checkCode != null) {
	        if ( checkCode == "demo") {
	            var r = confirm("you want to update?");
	            if (r == true) {
	      
					news[specifiedIndex].title = newTitle;
					news[specifiedIndex].content = newContent;
					news[specifiedIndex].image = newImage;
					news[specifiedIndex].hashtag = newHashtag;
					news[specifiedIndex].theloai = newTheloai;
					news[specifiedIndex].firstNews = newFirstNews;
					news[specifiedIndex].trangthai = newTrangthai;
					document.getElementsByClassName('form-update')[specifiedIndex].style.display="none"						    

					render();
					addEventDeleteUpdate();
					addEventSubUpdateCancel()
					localStorage.setItem(storageKey, JSON.stringify(news));

	            }
	        } else {
	          alert("wrong password");
	        }

	      }


		}

}

    function subCancel(event) {
      var button = event.target
      var i = button.dataset.id;
      var formUpdate = i.replace("cancel", "formUpdate");
      document.getElementById(formUpdate).style.display="none";
    }

    function addEventDeleteUpdate() {
      deleteBtn = document.getElementsByClassName("delBtn");
      var updateBtn = document.getElementsByClassName("upBtn")
      var addPreview = document.getElementsByClassName("addPreviewBtn")
      for (var i = 0; i < deleteBtn.length; i ++) {
        deleteBtn[i].addEventListener('click', Delete)
        updateBtn[i].addEventListener('click', update);
        addPreview[i].addEventListener('click', addPreviewNews);
      } 
    }

    function addEventSubUpdateCancel() {
      var subUpdateBtn = document.getElementsByClassName('update-btn')
      var cancelBtn = document.getElementsByClassName('cancel-btn')
      for (var i = 0; i < subUpdateBtn.length; i ++) {
        subUpdateBtn[i].addEventListener('click', subUpdate)
        cancelBtn[i].addEventListener('click', subCancel);
      }
    }


    function render() {
      var htmlList = document.getElementById('todo-list');
      var content = news.map(function(item, index) {
        // return '<li>' + item.title + item.content + '</li>';
        return '<div class="card mb-3 " style="width: auto;">' +
		        	'<div class="card-body">' +
		        		'<h3 id="'+"title" + index + '" class="card-title font-weight-bold">' + item.title + '</h3>' +
		        		'<p id="'+"content" + index + '" class="card-text " style="white-space: pre-wrap;" >' + item.content + '</p>' +
		        		'<small id="image'+index+'" class="form-text text-muted">' + item.image + '</small>' +
		        		'<small id="hashtag'+index+'" class="form-text text-muted">' + item.hashtag + '</small>' +
		        		'<small id="theloai'+index+'" class="form-text text-muted">' + 'Thể loại: ' + item.theloai + '</small>' +
		        		'<small id="firstNews'+index+'" class="form-text text-muted">' + 'Xuất hiện đầu bản tin: '+ item.firstNews + '</small>' +
		        		'<small id="trangthai'+index+'" class="form-text text-muted">' + 'Trạng thái: '+ item.trangthai + '</small>' +
				        //form update
				        '<div id="'+"formUpdate" + index + '" class="form-update" style="display: none">' +
				        '<div class="form-group">' + 
				        	'<label for="exampleInputEmail1">' +'TITLE' + '</label>' + 
				        	//title
				        	'<input id="'+"title"+"update" + index + '" type="text" class="form-control" aria-describedby="emailHelp" placeholder="Add title here" value="' + item.title + '">' + 
				        	'<small id="emailHelp" class="form-text text-muted">' + 'TITLE HERE.' + '</small>' +
				        '</div>' + 
				        '<div class="alert alert-danger" id="'+"titleAlert" + index + '" style="display: none" role="alert">' + 'Require Title !!' + '</div>' + 
				        //cotent
				        '<div class="form-group">' + 
				        	'<label for="exampleInputPassword1">' +'CONTENT' + '</label>' +
				        	'<textarea id="'+"content"+"update" + index + '" type="text" class="form-control" aria-describedby="emailHelp" placeholder="Add title here" style="white-space: pre-wrap; height: 70px; align-items-flex-start">'
				        	 +item.content + 
				        	'</textarea>' + 
				        '</div>' +
				        '<div class="alert alert-danger" id="'+"contentAlert" + index + '" style="display: none" role="alert">' + 'Require Content !!' + '</div>' + 
				        
				        //THE ANH
				        // image
				        '<div class="input-group ">' + 
				          	'<div class="custom-file"> ' +
				            	'<input type="file" class="custom-file-input" id="'+"image"+"update" + index + '">' +
				            	'<label class="custom-file-label" for="inputGroupFile04">' + 'Chọn ảnh' + '</label>' +
				          	'</div>' +

				          	'<div class="input-group-append">' +
				            	'<button class="btn btn-outline-secondary" type="button">Button</button>' + 
				          	'</div>' +
				        '</div>' +
				        '<div class="alert alert-danger" id="'+"imageAlert" + index + '" style="display: none" role="alert">' + 'Require Image !!' + '</div>' + 
				        '<small id="emailHelp" class="form-text text-muted mb-3">' + 'Require.' + '</small>' + 

				        // hastag
				        '<div class="form-group font-weight-bold" style="width: 20%">' + 
				          	'<label for="exampleInputEmail1">' + 'Nhập hashtag' + '</label>' + 
				          	'<input type="text" class="form-control" id="'+"hashtag"+"update" + index + '" aria-describedby="emailHelp" placeholder="#Hashtag" value="'+item.hashtag+'">' + 
				          	'<small id="emailHelp" class="form-text text-muted">' + 'Require hastag' + '</small>'+ 
				          	'<div class="alert alert-danger" id="'+"hashtagAlert" + index + '" style="display: none" role="alert">' + 'Require Hashtag !!' + '</div>' + 
				        '</div>' + 

				        // the loai
				        '<div class="mb-2">' + '<span>' + 'thể loại' + '</span>' +
				            '<select class="ml-2" id="updateSelect'+index+'" >' + 
				  				'<option value="thethao">' + 'Thể thao' + '</option>' + 
				                '<option value="giaitri">' + 'Giải trí' + '</option>' +
				                '<option value="vanhoa">' + 'Văn hóa' + '</option>' + 
				                '<option value="giaoduc">' + 'Giáo dục' + '</option>' + 
				                '<option value="kinhte">' + 'Kinh tế' + '</option>' +
				                '<option value="xahoi">' + 'Xã hội' + '</option>' +
				                '<option value="thegioi">' + 'Thế giới' + '</option>' +
				                '<option value="phapluat">' + 'Pháp luật' + '</option>' +
				            '</select>' +
				        '</div>' + 

				        //tin hot  
				        '<input type="checkbox" id="'+"tinhot"+"update" + index + '" name="vehicle1" >' + 
				        '<label for="vehicle1">' + 'xuất hiện ở đầu bảng tin' + '</label>' + '<br>' + 

				        // cong khai or rieng tu
				        '<div class="mb-2">' + '<span>' + 'Trạng thái xuất bảng' + '</span>' +
				            '<select id="'+"trangthai"+"update" + index + '" class="ml-2" value="'+item.trangthai+'">' + 
				  				'<option value="congkhai">' + 'Công khai' + '</option>' + 
				                '<option value="riengtu">' + 'Riêng tư' + '</option>' +
				            '</select>' +
				        '</div>' +               
				        '<button id="'+"update" + index + '" data-id="'+"update" + index + '" type="submit" class="btn btn-primary mb-3 mr-3 update-btn">' + 'UPDATE' + '</button>' +
				        '<button id="'+"cancel" + index + '" data-id="'+"cancel" + index + '" type="submit" class="btn btn-primary mb-3 mr-3 cancel-btn">' + 'CANCEL' + '</button>' +
				        '</div>' + 

				        //dropdown menu

				        '<div class="dropdown dropdownBtn" data-id="dropdownBtn'+index+'" onclick="setValueUpdate(updateSelect'+index+', tinhotupdate'+index+', trangthaiupdate'+index+' ,'+index+')">' +
				        	'<button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
				        	 + 'CHUC NANG' + 
				        	'</button>' +
				        	'<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
				        		'<button class="dropdown-item upBtn" data-id="'+"mainUpdate" + index + '" >'
				        		 + 'Sửa' + 
				        		'</button>' +

				        		'<button class="dropdown-item delBtn" data-id="' + index + '">'
				        		 + 'Xóa' + 
				        		'</button>' +
				        		'<button class="dropdown-item " >' + 
				        			'<a class="addPreviewBtn" data-id="' + "addPreview" + index + '" style="text-decoration:none">' 
				        			 + 'Đăng bài' + 
				        			'</a>' + 
				        		'</button>' +
				        	'</div>' +
				        '</div>' +
		        	'</div>' +
		        '</div>'

      });

      htmlList.innerHTML = content.join('');
    }
    render();
    addEventDeleteUpdate();
    addEventSubUpdateCancel();