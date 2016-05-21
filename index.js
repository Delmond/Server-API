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
	else 
		console.log("Greska");

});
app.get("/register",function(req, res){

var username = req.param('username');
var password = req.param('password');
var email = req.param('email');

conneciton.query("INSERT INTO Users (username,password,email) VALUES (username,password,email);",
function(error, rows, field){

if(!error){
	console.log("Sve uspjelo");
	console.log(rows);
}else{
	console.log("Greska pri ubaciavanju!");

}
});
);
app.listen(3000);
