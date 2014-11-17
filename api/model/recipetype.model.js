'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeTypeSchema = new Schema({
	"_id":Number,
	"recipe_type":String
});

module.exports = mongoose.model('RecipeType', recipeTypeSchema);