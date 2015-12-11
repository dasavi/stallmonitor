/*----Require Config----*/
require('dotenv').load();
var express = require('express');
var _ = require('lodash');
var app = module.exports = express();
var bodyParser = require('body-parser');
var stallController = require('./custom_modules/stallController');
var notifyController = require('./custom_modules/notifyController');


/*----Configure Express------*/
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/stallmonitor'));
app.use(bodyParser.json());

/*------Start Server-------*/
app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'));
});

/*--------Routes----------*/
app.get('/stallmonitor', function(request, response) {
	response.sendfile('stallmonitor/index.html');
});

app.get('/stalls', function(request, response) {
	stallController.getAllStalls(function (statuses) {
		response.json({statuses: statuses});
	})
});

app.post('/stall', function(request, response) {
	var requestBody = request.body;
	console.log("Request Body: " + JSON.stringify(requestBody) );

	var floor = requestBody.floor,
		bathroom = requestBody.bathroom,
		stallName = requestBody.stallName,
		occupied = requestBody.occupied;
	
	if(!_.isString(floor) || !_.isString(bathroom) || 
		!_.isString(stallName) || !_.isBoolean(occupied)) {
		response.status(400);
		response.send("Bad data, yo");
	} else {
		stallController.updateStallStatus(floor, bathroom, stallName, occupied, response);
	}
});

app.get('/stall', function(request, response) {
	var requestBody = request.query;
	var floor = requestBody.floor,
		bathroom = requestBody.bathroom,
		stallName = requestBody.stallName;

	var callback = function(val){
		response.json({ "occupied": val });
	};

	if(!_.isString(floor) || !_.isString(bathroom) || !_.isString(stallName)) {
		response.status(400);
		response.send("Bad data, yo");
	} else {
		stallController.getStallStatus(floor, bathroom, stallName, callback);	
	}
});

app.post('/notify', function(request, response) {
	var requestBody = request.body;
	console.log("Request Body: " + JSON.stringify(requestBody) );

	var floor = requestBody.floor,
		bathroom = requestBody.bathroom,
		email = requestBody.email;
	
	if(!_.isString(floor) || !_.isString(bathroom) || !_.isString(email)) {
		response.status(400);
		response.send("Bad data, yo");
	} else {
		notifyController.register(floor, bathroom, email, response);
	}
});
