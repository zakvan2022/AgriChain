var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var cors = require('cors');
var dotenv = require('dotenv').config();

// var index = require('./routes/admin');
// var users = require('./routes/users');

var helpers = require('./helper');

var dbConnect = require('./db');
var db;
MongoClient.connect(dbConnect.url, (err, database) => {
	if (err)
	return console.log(err);
	db = database;
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Enable Cors
app.use(cors({
	credentials: true,
	origin: '*'
}));

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.use(async function (req, res, next) {
	if ( req.path == 'favicon.ico' || req.path == '/admin/sign-up' || req.path == '/change-activation-status' || req.path == '/login'|| req.path == '/reset-password'|| req.path == '/change-password' || req.path == '/batch' || req.path == '/users' ) {
		next();
	} else {
		try {
			var verify = helpers.verifyJWT(req.headers.authorization);
			// console.log(verify);
			if(verify) {
				var user =  await db.collection('users').findOne({
					email:verify.email,
					username:verify.username,
					type:verify.type
				});
				if(user.email == verify.email && user.username == verify.username && user.type == verify.type ){
					next();
				} else {
					res.status(400).send({
                        "status": "error",
                        "params": "",
                        "message": "Access Token Signature Mismatch"
                    });

				}
			} else {
				res.status(400).send({
                    "status": "error",
                    "params": "",
                    "message": "Access Token not Valid - Please Login Again"
                });
			}
		} catch (error) {
			console.log("Jwt try catch error")
            res.status(400).send({
                "status": "error",
                "params": "",
                "message": "Jwt try catch error"
            });
		}
	}
});

app.use(require('./controllers'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;