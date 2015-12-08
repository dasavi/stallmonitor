/**
*  This module keeps track of timers for each stall
*/
var timers ={};
var RESET_INTERVAL = 10000;

var getKey = function(floor, bathroom, stallName){
	return floor + bathroom + stallName;
};

exports.setTimer = function(floor, bathroom, stallName, callback) {
	var key = getKey(floor, bathroom, stallName);
	resetTimer(key);
	timers[key] = setTimeout(callback, RESET_INTERVAL);
};

var resetTimer = function(key) {
	var oldTimer = timers[key];
	clearTimeout(oldTimer);
};

