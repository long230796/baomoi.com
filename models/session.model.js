var mongoose = require('mongoose')

// create schema
var sessionSchema = new mongoose.Schema({
	idCommenter: String,
	sessionId: String,
	date: String,
	time: String,
	theloaidaxem: Array,
	baivietdaxem: Array
});

var Session = mongoose.model('Session', sessionSchema, 'session')

module.exports = Session;