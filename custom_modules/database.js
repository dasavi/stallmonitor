var Firebase = require("firebase");

var databaseUrl = process.env.DB_URL;
var myFirebaseRef = new Firebase(databaseUrl);
console.log("Using database: " + databaseUrl);

// var bathroomFieldName = "bathrooms";
var spacesFieldName = "spaces";
var notifyFieldName = "notify";

// exports.fields = {bathroomFieldName, spacesFieldName, notifyFieldName};

exports.getStallReference = function(floor, bathroom, stallName){
	return myFirebaseRef.child(floor)/*.child(bathroomFieldName)*/.child(bathroom).child(spacesFieldName).child(stallName);
};

exports.getNotifyReference = function(floor, bathroom){
	return myFirebaseRef.child(floor)/*.child(bathroomFieldName)*/.child(bathroom).child(notifyFieldName);
};

exports.getAllStalls = function() {
	return myFirebaseRef;
};
