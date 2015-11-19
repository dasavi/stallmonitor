var database = require('./database')

exports.updateStallStatus = function(floor, bathroom, stallName, occupied, response){
	var callback = function(error){
		if(error) {
			response.send(error);
		} else {
			response.send("done");
		}
	}

	var stallReference = database.getStallReference(floor, bathroom, stallName);
	stallReference.update({"occupied": occupied}, callback);
};

exports.getStallStatus = function(floor, bathroom, stallName, callback){
	console.log("Getting Stall: ", floor, bathroom, stallName);
	var stallReference = database.getStallReference(floor, bathroom, stallName);
	stallReference.child("occupied").once("value", function(snapshot) {
  		var isOccupied = snapshot.val();
  		callback(isOccupied);
	});
};