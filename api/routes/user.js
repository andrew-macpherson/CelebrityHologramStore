var crypto = require('crypto');
var randomstring = require('randomstring');

var connection = require('../db.js');
var algo = 'aes-128-cbc';

var user = function (app) {

  // Test a password
  app.get("/passwordTest", function (req, res) {
    // Get the ID param to use for our search. 
    var mykey = crypto.createCipher(algo, 'rbcVenturesPass');
    var encryptedPassword = mykey.update('Password1', 'utf8', 'hex') + mykey.final('hex');

    console.log(encryptedPassword);
  });



  // Login User
  app.post("/login", function (req, res) {
    // Get the ID param to use for our search. 
    var username = req.body.username;
    var password = req.body.password;

    //Encrypt password
    var mykey = crypto.createCipher(algo, 'rbcVenturesPass');
    var encryptedPassword = mykey.update(password, 'utf8', 'hex') + mykey.final('hex');


    var sql = 'SELECT * FROM user WHERE username = "'+username+'" AND password = "'+encryptedPassword+'"';
    connection.query(sql, function(err,user){
      if(err){
        res.status(400).send({err:err});
      }else{
        // If we have a user...
        if(user.length > 0){
          // add a record to accessToken table
          var accessToken = randomstring.generate(24);

          var insertTokenSql = 'INSERT INTO accessToken (id,userId) VALUES("'+accessToken+'",'+user[0].id+')';
          connection.query(insertTokenSql,function(err,result){
            if(err){
              res.status(400).send({err:err});
            }else{
              let userData = {
                accessToken: accessToken,
                id: user[0].id,
                username: user[0].username
              }
              res.status(200).send(userData)
            }
          });
        }else{
          res.status(400).send({success:false});
        }
        
      }
    })

  });



  app.post('/me',function(req,res){
    var accessToken = req.body.accessToken;

    var sql = 'SELECT * FROM accessToken WHERE id = "'+accessToken+'"';
    connection.query(sql, function(err,result){
      if(err){
        res.status(400).send({err:err});
      }else{
        // If access token exists...
        if(result.length > 0){
          var userDataSQL = 'SELECT * FROM user WHERE id = "'+result[0].userId+'"';
          connection.query(userDataSQL,function(err,result){
            if(err){
              res.status(400).send({err:err});
            }else{
              res.status(200).send(result)
            }
          });
        }else{
          res.status(400).send({success:false});
        }
        
      }
    })

  });


}

module.exports = user;