var database = require('./database');
var nodemailer = require('nodemailer');

var serverEmail = process.env.EMAIL_ADDRESS;
var serverEmailPwd = process.env.EMAIL_PASSWORD; 
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: serverEmail,
        pass: serverEmailPwd
    }
});

var sendEmailNotification = function(emailObj){
	console.log("Sending notification: " + emailObj.address);
	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: 'Occupy Stall St <'+serverEmail+'>', // sender address
	    to: emailObj.address, // list of receivers
	    subject: emailObj.subject, // Subject line
	    text: emailObj.text
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
	});
};

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

/**
* Send an email to all people who signed up to be notified of this bathroom.
* Clear the notification queue for the bathroom.
*/
exports.notifyListeners = function(floor, bathroom){
	database.getNotifyReference(floor, bathroom).once("value", function(snapshot){
		snapshot.forEach(function(child){
			var emailObj = {
				address: child.val(),
				subject: "Bathroom available!",
				text: floor + " " + bathroom + ": Your throne awaits" 
			};
			sendEmailNotification(emailObj);
		});
		//Clear queue. Notifications are one time only.
		database.getNotifyReference(floor,bathroom).remove();
	});
};