
// Fancy express train
var express = require("express");

// Path for the static files
var path = require("path");

// Mongoose for MongoDB communication
var mongoose = require("mongoose");

// BodyParser for incoming requests
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var errorHandler = require("errorhandler");
var logger = require("morgan");

// Template renderer?
var ejs = require("ejs");

// Filesystem
var fs = require("fs");

// Our application
var app = module.exports = express();

// Routes ------------------------------------------------
	
	// Home
	var home = require("./app/routes/default.js");

	// API
	var api = require("./app/routes/api.js");

// Configuration -----------------------------------------

	// Defaults for static file requests
	app.use(express.static(path.join(__dirname, 'public')));
	app.use('/bower', express.static('bower_components'));

	// Random ass shit
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(errorHandler({ dumpExceptions: true, showStack: true })); 

	// Set the view directory
	app.set('views', __dirname + '/app/views');

	// We'll be using ejs for render engine
	app.engine('html', ejs.renderFile);

	// Register routes
	app.use("/", home);
	app.use("/api", api);

// Database connection -----------------------------------

	mongoose.connect('mongodb://localhost/');

// Server stuff
var server = app.listen(3000, function () {

  this.host = server.address().address;
  this.port = server.address().port;
});

console.log('App listening at http://%s:%s', "localhost", 3000);