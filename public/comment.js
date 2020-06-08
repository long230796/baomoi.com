// $("#input-1").rating();
//- alert form id
var alertName = document.getElementsByClassName('alertName')[0]
var alertEmail = document.getElementsByClassName('alertEmail')[0]
var alertContent = document.getElementsByClassName('alertComment')[0]
var alertRating = document.getElementsByClassName('alertRating')[0]

var buttonComment = document.getElementsByClassName('commentBtn')[0]


buttonComment.addEventListener('click', checkValueComment);

function checkValueComment(event) {
	//- get value of form comment
	var nameComment = document.getElementsByClassName('nameComment')[0].value
	var emailComment = document.getElementsByClassName('emailComment')[0].value
	var contentComment = document.getElementsByClassName('contentComment')[0].value
	var ratingComment = document.getElementsByClassName('ratingComment')[0].value

	if (!nameComment) {
		alertName.innerHTML = "Bạn chưa điền thông tin"
		alertName.style.display="block";
	} else {
		var n = nameComment.includes("fuck") || 
				nameComment.includes("dkm") || 
				nameComment.includes("lol") || 
				nameComment.includes("mày") || 
				nameComment.includes("má") || 
				nameComment.includes("chó") || 
				nameComment.includes("concac") || 
				nameComment.includes("con cac") || 
				nameComment.includes("cak") || 
				nameComment.includes("cặc") || 
				nameComment.includes("lz") || 
				nameComment.includes("pussy") || 
				nameComment.includes("bitch");
		if (n == false) {
			alertName.style.display="none";

		} else {
			alertName.innerHTML = "từ ngữ không hợp lệ"
			alertName.style.display="block";
			return
		}
	}



	if (!emailComment) {
		alertEmail.innerHTML = "Bạn chưa điền thông tin"
		alertEmail.style.display="block";
	} else {
		var n = emailComment.includes("fuck") || 
				emailComment.includes("dkm") || 
				emailComment.includes("lol") || 
				emailComment.includes("mày") || 
				emailComment.includes("má") || 
				emailComment.includes("chó") || 
				emailComment.includes("concac") || 
				emailComment.includes("con cac") || 
				emailComment.includes("cak") || 
				emailComment.includes("cặc") || 
				emailComment.includes("lz") || 
				emailComment.includes("pussy") || 
				emailComment.includes("bitch");
		if (n == false) {
			alertEmail.style.display="none";
		} else {
			alertEmail.innerHTML = "từ ngữ không hợp lệ"
			alertEmail.style.display="block";
			return
		}
	}



	if (!contentComment) {
		alertContent.innerHTML = "Bạn chưa điền thông tin"
		alertContent.style.display="block";
	} else {
		var n = contentComment.includes("fuck") || 
				contentComment.includes("dkm") || 
				contentComment.includes("lol") || 
				contentComment.includes("má") || 
				contentComment.includes("chó") || 
				contentComment.includes("concac") || 
				contentComment.includes("con cac") || 
				contentComment.includes("cak") || 
				contentComment.includes("cặc") || 
				contentComment.includes("lz") || 
				contentComment.includes("pussy") || 
				contentComment.includes("bitch");
		if (n == false) {
			alertContent.style.display="none";
		} else {
			alertContent.innerHTML = "từ ngữ không hợp lệ"
			alertContent.style.display="block";
			return
		}
	}



	if (ratingComment == 0) {
		alertRating.innerHTML = "Bạn chưa nhập đánh giá"
		alertRating.style.display="block";
	} else {
		alertRating.style.display="none";
	}

	if (nameComment && emailComment && contentComment && ratingComment != 0) {
		var button = event.target;
		var i = button.dataset.id
		var formCommentId = i.replace("commentBtn", "formComment");
		document.getElementById(formCommentId).submit()
	}
}

// update comment

var actionUpdate = document.getElementsByClassName("actionUpdate")
var actionDelete = document.getElementsByClassName("actionDelete")
var submitUpdate = document.getElementsByClassName("submitUpdate")
var cancelUpdate = document.getElementsByClassName("cancelUpdate")


for (var i = 0; i < submitUpdate.length; i ++) {
	
	submitUpdate[i].addEventListener('click', submitNewUpdate)
	cancelUpdate[i].addEventListener('click', nonDisplayUpdate)

}

for (var i = 0; i < actionDelete.length; i ++) {
	actionDelete[i].addEventListener('click', deleteUpdate)

}

for (var i = 0; i < actionUpdate.length; i ++) {
	actionUpdate[i].addEventListener('click', displayUpdate)

}

function displayUpdate(event) {
	var button = event.target;
	var i = button.dataset.id;
	var formUpdateId = i.replace("actionUpdate-", "formUpdate-");
	document.getElementById(formUpdateId).style.display = "block"
}

function deleteUpdate(event) {
	var choose = confirm("Bạn có muốn xóa bình luận này ? ");
	if (choose == true) {
		var button = event.target
		var i = button.dataset.id
		var hiddenForm = i.replace("actionDelete-", "hiddenForm-");
		document.getElementById(hiddenForm).submit();
	}
}

function submitNewUpdate(event) {
	var button = event.target
	var i = button.dataset.id

	var ratingUpdate = i.replace("submitUpdate-", "ratingUpdate-");
	var alertRating = i.replace("submitUpdate-", "alertRating-");
	var formUpdateId = i.replace("submitUpdate-", "formUpdate-");
	var valueRating = document.getElementById(ratingUpdate).value

	if (valueRating == 0) {
		document.getElementById(alertRating).innerHTML = "Bạn chưa đánh giá bài viết"
		document.getElementById(alertRating).style.display = "block"
	}
	else {
		var choose = confirm("Bạn có muốn cập nhật không ? ");
		if (choose == true) {
			document.getElementById(formUpdateId).submit();
		}
			
	}
}

function nonDisplayUpdate(event) {
	var button = event.target
	var i = button.dataset.id
	var formUpdateId = i.replace("cancelUpdate-", "formUpdate-");
	document.getElementById(formUpdateId).style.display = "none"
}