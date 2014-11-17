'use strict';

//required dependencies (including 3rd party middlewares)
var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

//instantiate express application
var app = express();
//set api directory
app.set('api', path.join(__dirname, '/app/api'));

//set node http server port
app.set('port', process.env.PORT || 3000);
//configure body-parser for JSON
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//database connection
var mongoose = require('mongoose');//mongoose orm
mongoose.connect('mongodb://@localhost:27017/recipesdb', {safe:true});

//error handlers
app.use(function(err, req, res, next){
	res.status(res.status || 500);
	res.render('Recipe API Error', {
		message:err.message,
		error:err.stack
	});
});

/** API Routes **/
//router middleware
var router = express.Router();
//routes implementation modules
var routes = require('./api/routes');

router.get('/api', routes.welcomeAPI);//api end point
router.get('/api/recipetypes', routes.getRecipeTypes);//recipe types listing end point
router.get('/api/recipetype/:recipe_type', routes.getRecipeType);//retrieve specific recipe type end point
router.post('/api/recipetype', routes.createRecipeType);//create a new recipe type (POST)
router.put('/api/recipetype/:recipe_type', routes.updateRecipeType);
router.delete('/api/recipetype', routes.deleteRecipeType);

//use router middleware
app.use('/', router);

//create server & listen on port 3000
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express Server Running!');
});

//export app
exports = module.exports = app;