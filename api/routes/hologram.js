var faker = require("faker");
var connection = require('../db.js');


var hologram = function (app) {



  // Add a Celebrity Hologram
  app.post("/hologram", function (req, res) {
    // @todo: Validate
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var image = req.body.image;
    var description = req.body.description;
    var price = req.body.price;

    var userId = false;
    if(req.body.id !== undefined){
      userId = req.body.id;
    }

    // Quick validation
    let errors = [];
    if(firstName == undefined){
      errors.push('First Name cannot be empty');
    }
    if(lastName == undefined){
      errors.push('Last Name cannot be empty');
    }

    // If errors send back 400 response 
    if(errors.length > 0){
      res.status(400).send({success:false});
    }else{
      // Run Insert Query
      if(userId){
        var sql = 'UPDATE hologram set firstName="'+firstName+'", lastName="'+lastName+'", description="'+description+'", image="'+image+'", price="'+price+'" WHERE id = '+userId+'';
      }else{
        var sql = 'INSERT INTO hologram (firstName, lastName, image, description, price) VALUES ("'+firstName+'", "'+lastName+'", "'+image+'","'+description+'","'+price+'")';
      }
      connection.query(sql, function (err, result) {
        if (err){
          // Send error back
          res.status(400).send({success:false});
        }else{
          // Send success back
          res.status(200).send({success:true});
        }
        
      });
    }
    
  });






  // Find a Celebrity Hologram by ID
  app.get("/hologram/:id", function (req, res) {

    // Get the ID param to use for our search. 
    var id = req.params.id;

    var sql = 'SELECT * FROM hologram WHERE id = '+id+'';
    connection.query(sql, function(err,result){
      if(err){
        res.status(400).send({success:false});
      }else{
        res.status(200).send(result)
      }
    })
  });






  // List of Celebrity Holograms
  app.get("/holograms", function (req, res) {
    // Get the ID param to use for our search. 
    var id = req.params.id;

    var sql = 'SELECT * FROM hologram';
    connection.query(sql, function(err,result){
      if(err){
        res.status(400).send({err:err});
      }else{
        res.status(200).send(result)
      }
    })
  });






  // Delete a Celebrity Hologram by ID
  app.delete("/hologram/:id", function (req, res) {
    var id = req.params.id;

    var sql = 'DELETE FROM hologram WHERE id = '+id+'';
    connection.query(sql,function(err,result){
      if(err){
        res.status(400).send({err:err});
      }else{
        var data = {
          success: true
        };
        res.status(200).send(data);  
      }
    })
    
  });



}

module.exports = hologram;