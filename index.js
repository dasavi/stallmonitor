/*----Require Config----*/
var express = require('express');
var app = module.exports = express();
var bodyParser = require('body-parser');
var stallController = require('./custom_modules/stallController');

/*----Configure Express------*/
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/stallmonitor'));
app.use(bodyParser.json());

/*------Start Server-------*/
app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'));
});

/*--------Routes----------*/
app.get('/', function(request, response) {
	response.send('Hello World!');
});

app.get('/stallmonitor', function(request, response) {
	response.sendfile('stallmonitor/index.html');
});

app.post('/stall', function(request, response) {
	var requestBody = request.body;
	console.log("Request Body: " + JSON.stringify(requestBody) );

	var floor = requestBody.floor,
		bathroom = requestBody.bathroom,
		stallName = requestBody.stallName,
		occupied = requestBody.occupied;
	
	stallController.updateStallStatus(floor, bathroom, stallName, occupied, response);
});

app.get('/stall', function(request, response) {
	var requestBody = request.query;
	var floor = requestBody.floor,
		bathroom = requestBody.bathroom,
		stallName = requestBody.stallName;

	var callback = function(val){
		response.json({ "occupied": val });;
	};

	stallController.getStallStatus(floor, bathroom, stallName, callback);
});
