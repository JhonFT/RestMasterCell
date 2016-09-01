var express = require('express'), 
mysql      = require('mysql');
var app = express();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'cellmaster'
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");    
} else {
    console.log("Error connecting database ... nn");    
}
});

app.get("/",function(req,res,next){
connection.query('SELECT * from features', function(err, rows, fields) {
  if (!err)
     res.json(rows);
  else
    console.log('Error while performing Query.');
  });
});

app.get("/newCell",function(req,res){
	var post = {
        process:'12gh',
        ram_memory:'4gb',
        internal_memory:'30gb',
        width:'12mm',
        heigth:'200mm',
        thickness: '10mm',
        resolution: '1280*24',
        camera:'12mpx',
        batery:'20h',
        image:'img/Samsung-1618-0.png', 
        price: 400000
    };
var query = connection.query('INSERT INTO features SET ?', post, function(err, result) {

  if (!err)
     console.log(result);
  else
    console.log('Error while performing Query.');
  });

res.end(query.sql); 
});

app.listen(3000);