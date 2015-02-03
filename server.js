//This is a fuckning server


//set ups ==============================================

	var express = require('express');

	var app = express();

	var mongoose = require('mongoose');

	var morgan = require('morgan');

	var bodyParser = require('body-parser');

	var methodOverride = require('method-override');

	mongoose.connect('localhost:27017');
	// connect to mongoDB database on modulus.io
	// modulus.io?

	app.use(express.static(__dirname + '/public')); 
	//set /public as home or something?
	// /public/img is /img to users

	app.use(morgan('dev'));
	//log every request to console

	app.use(bodyParser.urlencoded({
		'extended'	: 'true'
	}))
	// parse application/x-www-form-urlencoded
	// no idea..

	app.use(bodyParser.json());

	app.use(bodyParser.json({
		type	: 'application/vnd.api+json'
	})); 
	// parse application/vnd.api+json as json

	app.use(methodOverride());



// define model ========================================

	var Todo = mongoose.model('Todo', {text	: String});
	// node will automatically generate an _id for each todo





//routes ============================================

	// api ------------------------------------------

	// get all todos
	app.get('/api/todos', function(rep,res){
		//use mongoose to get all todos in the database
		// console.log("HelloWorld");
		Todo.find(function(err, todos){
			//if there is an error retrieving, send error.
			//Nothing after will execute
			if(err){
				res.send(err)
			}
			console.log(todos);
			//return all todos in JSON format
			res.json(todos);
		});
	});


	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res){

		// create a todo, information comes from 
		//AJAX request from Angular
		Todo.create({
			text	: req.body.text,
			done 	: false
		}, function(err, todo){
			if(err){
				res.send(err);
			}

			// get and return all the todos after you create another
			Todo.find(function(err, todos){
				if(err){
					res.send(err)
				}
				res.json(todos);
			});
		});

	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res){
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo){
			if(err){
				res.send(err);
			}

			//get and return all the todos after you create another
			Todo.find(function(err, todos){
				if(err){
					res.send(err)
				}
				res.json(todos);
			})
		})
	})



	// application-----------------------------------

	app.get('*', function(req, res){
		res.sendfile('./public/index.html');
		// load the single view file (angular will
		//  handle the page changes on the front-end)
	});










// listen (start app with node server.js) ===============

	app.listen(3000);
	console.log("Listening on port 3000");








