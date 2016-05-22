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

connection.connect(function(err){

if(!err){
	console.log("Database is connected!");
} else {
	console.log("Fucked up, the database connection is!!")
}
});


app.get("/", function(req,res){

connection.query('SELECT * FROM Users;',function(err,rows,fields){
	if(!err)
		console.log(rows);
		res.status(200).send(rows);
	else
		console.log("Greska");
		res.status(400).send(rows);

});
});
app.get("/register",function(req, res){

var username = req.query.username;
var password = req.query.password;
var email = req.query.email;
if(username == null || password == null || email== null){
	console.log("/register with incorrect parametars called!");
	console.log(username, password,email);
	res.status(400).send();
} else {
	console.log("/register good");
	conneciton.query("INSERT INTO Users (username,password,email) VALUES (username,password,email);",
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
app.listen(3000);
