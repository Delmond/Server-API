express = require("express");
mysql = require('mysql');
http = require('http');
nodemailer = require('nodemailer');
smtp = require('nodemailer-smtp-transport');
connectionData = require('./connectionData.json');
gmailData = {		
 	host : "smtp.gmail.com",		
 	secureConnection : false,		
 	port: 587,			
 	auth:{		
 		user: 'muhamed.dela@gmail.com',		
 		pass: 'hilerskihrast2'		
 	}		
};

connection = mysql.createConnection();

var transporter = nodemailer.createTransport(smtp( gmailData));
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
		console.log(username, password,email);
		var data = {username:username,password:password,email:email,registrationdate:new Date()};
		console.log(data);
		connection.query("INSERT INTO Users SET ?", data,
	function(error, rows, field){
		if(!error){
			console.log("Sve uspjelo");
			console.log(rows);
			res.status(200).send();
			var emailData = {
				from: 'Muhamed Delalic <muha.delalic@gmail.com>',
				to: email,
				subject: 'Dobrodosao na Shem, jedan od prvih si!',
				text: 'Ukoliko imate bilo kakvih dodatnih pitanja, zadrzite ih za sebe.'
				
			};
			transporter.sendMail(emailData, function(err,info) {
				if(err){ console.log('Error od nodemailer-a: ' + err);  }
				else {console.log('Odgovor od nodemailer-a:' + info);}
			});
		}else{
			console.log(error);
			console.log("Greska pri ubaciavanju!");
			//console.log(rows);
			res.status(400).send();
		}
	});
	}
});
app.get("/login", function(req, res){
	var username = req.query.username;
	var password = req.query.password;
	connection.query("SELECT * FROM Users WHERE username='"+username + "' AND password='" + password+"';",
	 	function(error, rows, field){
			res.set('Content-Type', 'application/json');
			if(!error){
				console.log(rows);
				if(rows && rows.length == 1) {
				console.log("Uspjesan Login");
				res.status(200).json(rows[0]);
			}else {
				console.log("Username or/and password don't match!");
				res.status(403).json({error:'Username or/and password dont match'});
			}
			}else{
				console.log(error);
				res.status(500).json({error:"Problem with Server!"});
			}

	});
});
app.get("/search",function(req, res){
		var querry = req.query.q;
		if(querry!=null){
			connection.query("SELECT * FROM Users WHERE username LIKE '"+ querry + "%';", function(error, rows, field){
				if(!error){
						if(rows.length != 0){
							res.status(200).send(rows);
							console.log(rows);
					}	else{
						res.status(100).send("No users found!");
						console.log(error);
					}
				}else{
					res.status(400).send("Error, bad request!");
				}
			});
} else {
	console.log("querry string nije definisan");
}
});
app.get("/mycollections", functions(req, res) {
		var ID = req.query.ID;
		if(ID == null) {
			res.status(400).json({});
			return;
			
		}

		connection.query("SELECT * FROM Collections WHERE author_id=" + ID +" ORDER BY creationdate DESC",
		function(error, rows, field){
			if(error) { 
				res.status(500).json({});
				console.log(error);
				return;
			}
				res.status(200).json(rows);
				console.log(rows);
});		
		


});



/*
app.get("/like", function(req, res){
		var id = req.query.id;
		var collection_id = req.query.collection_id;
		if (id == null || collection_id == null){
			res.status(400).send("Error, bad request!");
		} else {
			connection.query("INSERT INTO Likes SET? ", {author_id:id, collection_id:collection_id}, function(error,rows,field){
				if(error){
					res.status(400).{"Error inserting!"};
				}{
					res.status(200).send("Liked Succesfuly!")
				}
			});
		}
});

app.get("/unlike", function(req, res){
	var id = req.query.id;
	var collection_id = req.query.collection_id;
	if (id == null || collection_id == null){
		res.status(400).send("Error, bad request!");
	} else {
		connection.query("DELETE FROM Likes SET? ", {author_id:id, collection_id:collection_id}, function(error,rows,field){
			if(error){
				res.status(400).{"Error inserting!"};
			}{
				res.status(200).send("Unliked Succesfuly!")
			}
		});
	}
});

app.get("/follow",function(req, res){
	var id = req.query.id;
	var friend_id = req.query.friend_id;

});
*/
app.listen(3000);
