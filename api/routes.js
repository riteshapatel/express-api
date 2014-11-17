'use strict';

var RecipeType = require('./model/recipetype.model');
var logger = require(__dirname + '/../utils/logger');
/**
 * welcomeAPI()
 * @Request GET
 * Root API route message
*/
exports.welcomeAPI = function(req, res){
	logger.log('info', 'Recipe API called!');
	res.json({message:'Welcome to Recipe API!'});
}

/**
 * getRecipeTypes()
 * @Request GET
 * Returns Recipe Types Listing
*/
exports.getRecipeTypes = function(req, res){
	RecipeType.find(function(err, recipetypes){
		if(err) console.log('Error querying recipe types collection');
		res.json(recipetypes);
	});
}

/**
 * createRecipeType()
 * @Request POST
 * Creates a new Recipe Type
*/
exports.createRecipeType = function(req, res){
	if(req.body.recipe_type){//if recipe_type passed in the request body
		//count for the same recipe type
		RecipeType.count({recipe_type:req.body.recipe_type}, function(err, count){
			if(err) console.log('Error counting recipe types');
			//if recipe type exists then return
			if(count > 0){
				res.json({message:'Recipe type exists! Please try another recipe type'});
			}else{
				//add new recipe type
				RecipeType.create(req.body, function(err, recipetype){
					if(err) console.log('Error saving recipe type');
					res.json(recipetype);
				});
			}
		});
	}
}

/**
 * updateRecipeType()
 * @Request PUT
*/
exports.updateRecipeType = function(req, res){
	if(req.params.recipe_type){
		RecipeType.count({recipe_type:req.params.recipe_type}, function(err, count){
			if(err) res.json({message:'Error updating recipe type'});
			if(count > 0){
				RecipeType.update({recipe_type:req.params.recipe_type}, {recipe_type:req.body.recipe_type}, function(err){
					if(err) res.json({message:'Error updating recipe type'});
					res.json({message:'Recipe type updated successfully!'});
				});
			}else{
				res.json({message:'Recipe type not found'});
			}
		});
	}
}

/**
 * deleteRecipeType()
 * @Request DELETE
 * Removes a specific recipe type
*/
exports.deleteRecipeType = function(req, res){
	if(req.body.recipe_type){
		RecipeType.remove({recipe_type:req.body.recipe_type}, function(err){
			if(err) res.json({message:'Error removing recipe type'});
			res.json(req.body.recipe_type + " removed successfully!");
		});
	}
}

/**
 * getRecipeType
 * @Request GET
 * Get a specific recipe type
*/
exports.getRecipeType = function(req, res){
	if(req.params.recipe_type){
		RecipeType.findOne({recipe_type:req.params.recipe_type}, function(err, recipetype){
			if(err) res.json({message:'Error retreiving recipe type'});
			if(recipetype){
				res.json(recipetype);				
			}else{
				res.json({message:'Recipe Type ' + req.params.recipe_type + ' not found'});
			}

		});
	}else{
		res.json({message:'Recipe type not found'});
	}
}
