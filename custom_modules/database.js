var Firebase = require("firebase");

var databaseUrl = process.env.DB_URL;
var myFirebaseRef = new Firebase(databaseUrl);
console.log("Using database: " + databaseUrl);

exports.getStallReference = function(floor, bathroom, stallName){
	return myFirebaseRef.child(floor).child(bathroom).child("spaces").child(stallName);	
};

exports.getNotifyReference = function(floor, bathroom){
	return myFirebaseRef.child(floor).child(bathroom).child("notify");	
};