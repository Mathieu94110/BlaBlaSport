var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto')



var sportSchema = new Schema({
 
    nom:String
});






var Sport = mongoose.model("Sport", sportSchema);
exports.Sport = Sport;