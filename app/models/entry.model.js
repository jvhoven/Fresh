var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var entrySchema = new Schema({
	title: String,
	created: { type: Date, default: Date.now },
	text: String
});

var Entry = mongoose.model('Entry', entrySchema);