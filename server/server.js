var express = require('express');
var app  = express();

var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));

var con = mysql.createConnection({
 
    host:'localhost',
    // port:'80',
    user:'root',
    password:'', //empty for window
    database: 'auc'

});

var server = app.listen(4547, function(){
  var host = server.address().address
  var port = server.address().port
  console.log("start");

});

con.connect(function(error){
  if(error) console.log(error);
  else console.log("connected");
});

app.get('/bidView', function(req, res){
  con.query('select * from bid', function(error, rows, fields){
        if(error) console.log(error);

        else{ 
            console.log(rows);
            res.send(rows);

        }

  });
});


app.post('/register', function(req, res){
	console.log(req.body); 
    var data = {teamName:req.body.teamName,password:req.body.password};
    var sql = 'INSERT INTO user SET ?';
    con.query(sql, data, (err, result)=>{
    if(err) throw err;
    // console.log(result);
    res.send({
        status: 'Data inserted',
        no: null,
		name: req.body.nama,
	});
});
});


app.post('/login', function(req, res){
  console.log(req.body); 
    // var data = {name:req.body.name};
    var teamName=req.body.teamName;
    var password=req.body.password;
    var sql="SELECT id,teamName,password FROM `user` WHERE `teamName`='"+teamName+"' and `password`='"+password+"' ";                           
    con.query(sql, function(err, results){      
       if(results.length){
          
          console.log('login');
          res.send({
            code : 1,
            status: 'login',
            no: null,
      });
       }
       else{
          console.log('error');
          res.send({
            code : 0,
            status: 'error occured',
            no: null,
      });
       }
               
    });  
    

  
});

app.post('/add', function(req, res){
  console.log(req.body); 
    var data = {teamName:'',playerName:req.body.playerName,initialBid:req.body.initialBid,topBid:0};
    // var sql = '  INSERT INTO `bid` (teamname`, `playername`, `initialbid`) VALUES ("'+teamName+'","'+playerName+'","'+initialBid+'");';
    var sql = 'INSERT INTO bid SET ?';

    con.query(sql, data, (err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send({
        status: 'Data inserted',
        no: null,
		// name: req.body.nama,
	});
});
});

app.post('/bid', function(req, res){
  console.log(req.body); 
    var teamname=req.body.teamname;
    var id=req.body.id;
    var topbid =req.body.topbid;
    // console.log(teamName);
    // console.log(id);
    // console.log(topBid);

  var sql = "UPDATE `bid` SET `topbid`='"+topbid+"',`teamname`='"+teamname+"' WHERE `id`='"+id+"' ";
  con.query(sql, function(err, results){      
    if(err) throw err;
    console.log(results);
    res.send({
        status: 'Data updated',
        no: null,
	});
            
 });  
});