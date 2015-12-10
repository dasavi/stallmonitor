/**
*  This module keeps track of timers for each stall
*/
var _ = require('lodash');

var DEFAULT_EXPIRE_TIME = 10000
var STATUS_EXPIRE_TIME = process.env.STATUS_EXPIRE_TIME;
var RESET_INTERVAL = _.isNull(STATUS_EXPIRE_TIME) || _.isUndefined(STATUS_EXPIRE_TIME) ? 
DEFAULT_EXPIRE_TIME : STATUS_EXPIRE_TIME;

//Object containing timers for all active stalls
var timers ={};

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

