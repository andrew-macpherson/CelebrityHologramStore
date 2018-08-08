var connection = require('../db.js');

var multer = require('multer');
var fs = require('fs');
var Jimp = require("jimp");

var hologram = function (app) {



  // Add a Celebrity Hologram
  app.post("/hologram", function (req, res) {
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






  // Upload File
  app.post("/upload", function (req, res) {

    var uploadedFileName = '';
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            // checking and creating uploads folder where files will be uploaded
            var dirPath = '../uploads/'
            if (!fs.existsSync(dirPath)) {
                var dir = fs.mkdirSync(dirPath);
            }
            cb(null, dirPath + '/');
        },
        filename: function (req, file, cb) {
            var ext = file.originalname.substring(file.originalname.lastIndexOf("."));
            var fileName = Date.now() + ext;
            uploadedFileName = fileName;
            cb(null, fileName);
        }
    });

    var upload = multer({
        storage: storage
    }).array('image', 12);

    upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading
            res.status(400).send({err:err});
        }

        // RESIZE IMAGE
        Jimp.read("../uploads/"+uploadedFileName, function (err, image) {
            if (err){
                console.log(err);
                throw err;
            }
            image.scaleToFit(375, Jimp.AUTO)
             .quality(100)
             .write("../uploads/thumbs/"+uploadedFileName, function(){
                res.status(200).send(uploadedFileName);  
             });
        });

    });
    
  });



}

module.exports = hologram;