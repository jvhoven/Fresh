var express = require('express');
var router = express.Router();
var fs = require("fs");

// Models -----------------------------------------


// Routes ----------------------------------------
router.get('/', function(req, res) {
	var html = read('app/views/index.html');
	res.render('_shared/_layout.ejs', { body: html });
});

router.get('/entry/:id', function(req, res) {
	var html = read('app/views/entry.html');
	res.render('_shared/_layout.ejs', { body: html });
});

router.get('/entry', function(req, res) {
	var html = read('app/views/entry.html');
	res.render('_shared/_layout.ejs', { body: html });
})

// Helper functions -----------------------------

function read(url) {

	var html = fs.readFileSync(url, 'utf8');
	if(typeof(html) == 'undefined') {
		console.log("Something went wrong with trying to load view " + url);
		return;
	}

	return html;
}

module.exports = router;
