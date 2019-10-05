// Il charge et configure konphyg pour utiliser le dossier de configuration
var config = require('konphyg')(__dirname+"/../config");

// Il charge les infos de connection de mongo
var mongoconfig = config('mongo');

// Il charge le driver mongoose
var mongoose = require('mongoose');

	console.log("mongodb://"+mongoconfig.username+":"+mongoconfig.password+"@"+mongoconfig.url+":"+mongoconfig.port+"/"+mongoconfig.dbname);


var connect = function (callback){
	mongoose.set("debug", true);
	mongoose.connect("mongodb+srv://mathieu:azerty@blablasport-2g82v.mongodb.net/mathieu?retryWrites=true&w=majority");
	var db = mongoose.connection;
	db.on("error", console.error.bind(console," Connection error"));
	db.once("open", function (){
		console.log('Super, vous êtes connecté à la base de données');
		callback();
	});
};

// création d'une Erreur

var processError = function (err, res, callback){
	if(err){
		res.json({
			success: false,
			error: {
				message: err.message
			}
		});
	}else{
		callback();
	}
};

module.exports.processError = processError;
module.exports.connect = connect;
