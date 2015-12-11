var Firebase = require("firebase");
var myFirebaseRef = new Firebase("https://stallmonitor.firebaseio.com/");

exports.getStallReference = function(floor, bathroom, stallName){
	return myFirebaseRef.child(floor).child(bathroom).child("spaces").child(stallName);	
};

exports.getNotifyReference = function(floor, bathroom){
	return myFirebaseRef.child(floor).child(bathroom).child("notify");	
};

exports.getAllStalls = function() {
	return myFirebaseRef;
};