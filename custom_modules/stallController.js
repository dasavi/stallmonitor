var database = require('./database')

exports.updateStallStatus = function(floor, bathroom, stallName, occupied){
	var stallReference = database.getStallReference(floor, bathroom, stallName);
	stallReference.update({"occupied": occupied});
};

exports.getStallStatus = function(floor, bathroom, stallName){
	var stallReference = database.getStallReference(floor, bathroom, stallName);
	return stallReference.child("occupied").val();
};