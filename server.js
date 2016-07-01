var express = require("express"); // Fancy nodejs stuff
var path = require("path"); // Path for static files
var mongoose = require("mongoose"); // Mongoose for easy MongoDB communication
var bodyParser = require("body-parser"); // Bodyparser for incoming requests
var methodOverride = require("method-override");
var errorHandler = require("errorhandler");
var logger = require("morgan"); // Morgan for logging all incoming requests
var ejs = require("ejs"); // EJS as renderen, I don't like the syntax of jade and it looks ugly
var fs = require("fs"); // Filesystem for fetching the shared layout
var username = process.env.user;
var password = process.env.password;

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

	mongoose.connect('mongodb://' + username + ':' + password + '@ds055885.mlab.com:55885/fractional-escalated-hackwork', function(err) {
		if(err)
			console.log("Could not connect to database, are your credentials correct in server.js? \n" + err);

	});

// Server stuff
var server = app.listen(3000, function () {

  this.host = server.address().address;
  this.port = server.address().port;
});

console.log('App listening at http://%s:%s', "localhost", 3000);
