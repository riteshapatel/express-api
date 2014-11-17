'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new Schema({
	"_id":Number,
	"name":String,
	"title":String,
	"prep_time":String,
	"total_time":String,
	"difficulty":String,
	"recipe":String,
	"recipe_type":Number,
	"tag_words":String,
	"contributor":Number,
	"stars":Number
});
module.exports = mongoose.model('Recipe', recipeSchema);