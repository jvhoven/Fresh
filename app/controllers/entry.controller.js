var exports = module.exports;
var mongoose = require("mongoose");

// Models ----------------------------------

require("../models/entry.model");
var Entry = mongoose.model("Entry");

// Controller fuctions ----------------------

exports.list = function(req, res) {

	Entry.find(function(err, obj) {
		if(err)
			console.log(err);

		res.json(obj);
	});
}

exports.read = function(req, res) {

	Entry.findOne({ _id: req.params.id }, function(err, obj) {
		if(err)
			console.log(err);
		
		res.json(obj);
	});
}

exports.create = function(req, res) {

	console.log(req.body);

	var entry = new Entry(req.body);
	entry.save(function(err){
		if(err)
			console.log(err);

		res.redirect('/');
	});
}
