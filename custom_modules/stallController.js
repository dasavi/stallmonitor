var database = require('./database');
var timers = require('./timer');
var notify = require('./notifyController');

exports.updateStallStatus = function(floor, bathroom, stallName, occupied, response){
	var callback = function(error){
		if(error) {
			response.send(error);
		} else {
			response.send("done");
		}
	};

	var stallReference = database.getStallReference(floor, bathroom, stallName);
	stallReference.update({"occupied": occupied, "active": true}, callback);

	// Set a timer to mark the stall inactive if it isn't updated in a long time
	timers.setTimer(floor, bathroom, stallName, function(){
		console.log("Stall status expired");
		stallReference.update({"active": false});
	});

	//Notify people if a stall is being marked as free
	if(!occupied) {
		notify.notifyListeners(floor, bathroom);	
	}	
};

exports.getStallStatus = function(floor, bathroom, stallName, callback){
	console.log("Getting Stall: ", floor, bathroom, stallName);

	var stallReference = database.getStallReference(floor, bathroom, stallName);

	stallReference.child("occupied").once("value", function(snapshot) {
  		var isOccupied = snapshot.val();

  		callback(isOccupied);
	});
};

exports.getAllStalls = function(callback){
	var stallReference = database.getAllStalls();

	stallReference.once("value", function(snapshot) {
  		var allStatuses = snapshot.val();

  		callback(allStatuses);
	});
};

