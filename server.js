var express = require('express');
var app = express();
//var cors = require('cors'); 
const db = require('./queries')
const bodyParser = require('body-parser')


// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;


// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// app.use(cors())

// app.use(cors({origin: [
//   "http://localhost:4200"
// ], credentials: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// set the home page route
app.get('/', function(req, res) {

	// ejs render automatically looks in the views folder
	res.render('index');
});


//app.get('/', db.getProd);
app.get('/product/:id', db.getProd);



app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});
