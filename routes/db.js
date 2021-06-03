var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'ayushi',
  password : '******',
  database : 'marketing'
});
 
connection.connect(function (error){
  if (error) throw error;
  //console.log(error);
  console.log("connected");
});
 
// connection.query("CREATE DATABASE marketing", function (err, result) {  
// if (err) throw err;  
// console.log("Database created");  
// });  







module.exports = connection;