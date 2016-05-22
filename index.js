express = require("express");
mysql = require('mysql');
http = require('http');


connection = mysql.createConnection({
	host	 : 'localhost',
	user	 : 'master',
	password : 'control',
	database : 'ShemDB'
});

var app = express();
var router = express.Router();
connection.connect(function(err){

if(!err){
	console.log("Database is connected!");
} else {
	console.log("Fucked up, the database connection is!!")
}
});


router.get("/", function(req,res){

connection.query('SELECT * FROM Users;',function(err,rows,fields){
	if(!err){
		console.log(rows);
		res.setHeader('Content-Type', 'application/json');
		res.status(200).send(rows);}
	else{
		console.log("Greska");
		res.status(400).send();
}

});
});
router.get("/register",function(req, res){

	var username = req.query.username;
	var password = req.query.password;
	var email = req.query.email;
	if(username == null || password == null || email== null){
		console.log("/register with incorrect parametars called!");
		console.log(username, password,email);
		res.status(400).send();
	} else {
		console.log("/register good");
		console.log(username, password,email);
		connection.query("INSERT INTO Users (username,password,email) VALUES (username,password,email);",
	function(error, rows, field){
		if(!error){
			console.log("Sve uspjelo");
			console.log(rows);
			res.status(200).send();
		}else{
			console.log("Greska pri ubaciavanju!");
			res.status(400).send();
		}
	});
	}
});
router.get("/register",function(req, res){

	var username = req.query.username;
	var password = req.query.password;
	var email = req.query.email;
	if(username == null || password == null || email== null){
		console.log("/register with incorrect parametars called!");
		console.log(username, password,email);
		res.status(400).send();
	} else {
		console.log("/register good");
		console.log(username, password,email);
		connection.query("INSERT INTO Users (username,password,email) VALUES (username,password,email);",
	function(error, rows, field){
		if(!error){
			console.log("Sve uspjelo");
			console.log(rows);
			res.status(200).send();
		}else{
			console.log("Greska pri ubaciavanju!");
		}
	});
	}
});
router.get("/login", function(req, res){
	var username = req.query.username;
	var password = req.query.email;
	connection.query("SELECT EXISTS(SELECT * FROM Users WHERE username="+username +	" AND email=" + email+");",
	 	function(error, rows, field){
			if(!error){
				console.log("Uspjesan Login");
				console.log(rows);
				res.status(200).send("Login Succesful!");
			}else{
				res.status(400).send("Login Unsuccesful!");
			}

	});
})
app.listen(3000);
