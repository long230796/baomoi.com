/* show file value after file select */
$('.custom-file-input').on('change',function(){
  var fileName = document.getElementById("exampleInputFile").files[0].name;
  $(this).next('.form-control-file').addClass("selected").html(fileName);
})

/* method 2 - change file input to text input after selection
$('.custom-file-input').on('change',function(){
    var fileName = $(this).val();
    $(this).next('.form-control-file').hide();
    $(this).toggleClass('form-control custom-file-input').attr('type','text').val(fileName);
})
*/

// script update news

function scriptAddNews() {
	var title = document.getElementsByClassName("title-update")[0].value
	var content = document.getElementsByClassName("content-update")[0].value
	var addImage = document.getElementsByClassName("image-update")[0].value
	var hashtag = document.getElementsByClassName("hashtag-update")[0].value
	// target alert 
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

function displayForm(value) {
	var array = value.split('-')
	var theloai = array[0]
	var firstNews = JSON.parse(array[1])
	var trangthai = array[2]
	document.getElementsByClassName("trangthai-update")[0].value = trangthai
	document.getElementsByClassName("check-update")[0].checked = firstNews
	document.getElementsByClassName("theloai-update")[0].value = theloai

	// display form

	document.getElementById("form-update").style.display="block"
	var elmnt = document.getElementsByClassName("leftInfo")[0];
	elmnt.scrollIntoView();

}

function nonDisplayForm() {
      document.getElementById('form-update').style.display="none";
}

function checkDelete() {
	var checkCode = prompt('Nhập mã để xóa')
	if (checkCode != null) {
		if ( checkCode == "demo") {
		    var r = confirm("bạn có muốn xóa toàn bộ bài viết này?");
		    if (r == true) {
				var formDelete = document.getElementById("formDelete")
				formDelete.submit()
		    }
		} else {
		  alert("nhập sai mã!");
		}

	}
}