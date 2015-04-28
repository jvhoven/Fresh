var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var entrySchema = new Schema({
	title: String,
	created: { type: Date, default: Date.now },
	description: String
});

var Entry = mongoose.model('Entry', entrySchema);