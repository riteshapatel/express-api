'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contributorSchema = new Schema({
	"_id":Number,
	"contributor_name":String,
	"account_status":String
});
module.exports = mongoose.model('Contributor', contributorSchema);