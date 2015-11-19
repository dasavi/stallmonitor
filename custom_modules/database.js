var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://stallmonitor.firebaseio.com/");

exports.getStallReference = function(floor, bathroom, stallName){
	return myFirebaseRef.child(floor).child(bathroom).child(stallName);	
};