var Admin = require("../models/admin.model.js")
module.exports.requireAuth = function (req, res, next) {
	if (!req.signedCookies.adminId) {   // node.head.adminId
		res.redirect('/admin/login');
		return
	}	 

	Admin.find({ _id: req.signedCookies.adminId })   // node.head.adminId
		.then(function(userCookie) {   // nếu đúng thì chạy then
			res.locals.user = userCookie;
			next();
		})
		.catch(function(err) {  // nếu sai thì catch
			res.redirect('/auth/login');
		})

	

}