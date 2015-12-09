var database = require('./database');

exports.register = function(floor, bathroom, email, response){
	var callback = function(error){
		if(error) {
			response.send(error);
		} else {
			response.send("done");
		}
	}

	var notifyReference = database.getNotifyReference(floor, bathroom);
	notifyReference.push(email, callback);
};

exports.clearNotificationQueue = function(floor, bathroom){
	var notifyReference = database.getNotifyReference(floor, bathroom);
	notifyReference.remove();
};