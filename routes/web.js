var express = require('express');
var router = express.Router();
var db = require('./db');
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var app     = express();
var path    = require("path");
var db = require('./db');



//rest api to get all the user
app.get('/', function (req, res) {
    console.log(req);
    db.query('select * from user', function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
 });
 // rest api to store parent split in table referral
 app.get('/referral/:id' , function(req,res){
  var sql = 'select parent1Id , parent2Id, parent3Id from user where userId = ?';
  var sql1 = 'select amount from wallet where userId = ?';
  var id = req.params.id;
  var p1= p2 = p3 = 0;
  var a =0;
  var am = 0;
  db.query(sql , [req.params.id], function (error, results , fields){
    if (error) throw error;
       var x = JSON.stringify(results);
       var y = JSON.parse(x)
       console.log(y[0].parent1Id);
       db.query(sql1 , [req.params.id] ,function(error, results,fields){
         if (error) throw error;
         //console.log(JSON.parse(results));
        a = JSON.stringify(results);
        am = JSON.parse(a);
         console.log(am[0].amount);
       
       if(y[0].parent1Id != 0){
         p1 = 0.4*(am[0].amount);
         console.log(p1)
       }
       if(y[0].parent2Id != 0){
         p2 = 0.2*am[0].amount;
      }
      if(y[0].parent3Id != 0){
         p3 = 0.1*am[0].amount;
      }
       var sql3 = "Insert INTO `referral`(`userId` , `parent1Id` , `parent2Id`, `parent3Id`) VALUES('"+id+"' , '"+p1+"' , '"+p2+"' , '"+p3+"' )";
       db.query(sql3 ,function(error, results,fields){
        if (error) throw error;
       })
    })
    res.end(JSON.stringify(results));
  })
})

// rest api to add a new user
app.post('/add' , function(req, res){
  var postData  = req.body;
  console.log(postData);
    db.query('INSERT INTO user SET ?', postData, function (error, results, fields) {
       if (error) throw error;
       res.end(JSON.stringify(results));
     });
})

//rest api to  add amount to table wallet.
app.post('/wallet', function(req,res){
  var postData = req.body;
  db.query('INSERT INTO wallet SET ?', postData, function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
})
//rest apit to delete a user
app.delete('/user', function (req, res) {
  console.log(req.body);
  connection.query('DELETE FROM `user` WHERE `userId`=?', [req.body.id], function (error, results, fields) {
   if (error) throw error;
   res.end('Record has been deleted!');
 });
});
// rest api to delete a the parentsplit
app.delete('/parent', function (req, res) {
  console.log(req.body);
  connection.query('DELETE FROM `referral` WHERE `userId`=?', [req.body.id], function (error, results, fields) {
   if (error) throw error;
   res.end('Record has been deleted!');
 });
});
// rest apit to delete data from wallet
app.delete('/wallet', function (req, res) {
  console.log(req.body);
  connection.query('DELETE FROM `wallet` WHERE `userId`=?', [req.body.id], function (error, results, fields) {
   if (error) throw error;
   res.end('Record has been deleted!');
 });
});
// to get all data from wallet
app.get('/wallet', function (req, res) {
  console.log(req);
  db.query('select * from wallet', function (error, results, fields) {
     if (error) throw error;
     res.end(JSON.stringify(results));
   });
});
// to get all data from parent
app.get('/parent', function (req, res) {
  console.log(req);
  db.query('select * from parent', function (error, results, fields) {
     if (error) throw error;
     res.end(JSON.stringify(results));
   });
});
module.exports = app;