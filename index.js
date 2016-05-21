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


});
app.listen(3000);
