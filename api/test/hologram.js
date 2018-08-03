process.env.NODE_ENV='test';
var faker = require("faker");

var connection = require('../db.js');
var server = require('../app.js');

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe('Holograms', () => {
	
	// Runs before all tests in the block to empty out the hologram table
    before((done) => { 
        connection.query('TRUNCATE table hologram',function(err,result){
	    	if(err){
	    		console.log(err); 
	    	}else{
	    		done();
	    	}
	    });
    });
    

    //Before tests run empty holograms database table. 

    

    // Test to add hologram
    describe('/POST hologram', () => {
	  it('it should POST a hologram', (done) => {
	    chai.request(server)
	        .post('/hologram')
	        .type('form')
	        .send({
	        	firstName:faker.name.firstName(),
	        	lastName:faker.name.lastName(),
	        	image:faker.image.imageUrl(),
	        	description: 'No description',
	        	price: faker.commerce.price
	        })
	        .end((err, res) => {
	        	res.should.be.json;
	            res.should.have.status(200);
	          done();
	        });
	  });
	});

	// Test to add hologram with error
    describe('/POST hologram error', () => {
	  it('it should POST a hologram and fail.', (done) => {
	    chai.request(server)
	        .post('/hologram')
	        .type('form')
	        .send({
	        	lastName:faker.name.lastName(),
	        	image:faker.image.imageUrl(),
	        	description: 'No description',
	        	price: faker.commerce.price
	        })
	        .end((err, res) => {
	        	res.should.be.json;
	            res.should.have.status(400);
	          done();
	        });
	  });
	});



    // Test to get all holograms
	describe('/GET holograms', () => {
	  it('it should GET all the holograms', (done) => {
	    chai.request(server)
	        .get('/holograms')
	        .end((err, res) => {
	            res.should.have.status(200);
	            res.should.be.json;
	            res.body.should.be.a('array');
	          done();
	        });
	  });
	});



	// Test to get one hologram
	describe('/GET hologram', () => {
	  it('it should GET one hologram', (done) => {
	    chai.request(server)
	        .get('/hologram/1')
	        .end((err, res) => {
	            res.should.have.status(200);
	            res.should.be.json;
	            res.body.should.be.an('array');
	            res.body.length.should.be.eql(1);
	          done();
	        });
	  });
	});

});