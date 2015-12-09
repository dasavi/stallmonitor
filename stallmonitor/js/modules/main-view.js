'use strict';
var mainView = angular.module('mainView', ['firebase']);
var notifyUrl = "/notify";

mainView.controller('mainViewCtrl', ['$scope', '$firebaseObject', '$http',
    function($scope, $firebase, $http) {
        
        var databaseRef = new Firebase("https://stallmonitor.firebaseio.com/"),
            syncObj = $firebase(databaseRef);

        $scope.floors = syncObj;

        //Log status
        databaseRef.on("value", function(snapshot) {
            console.log("Data updated:");
            console.log(snapshot.val());
        });

        $scope.showInput = false;
        $scope.notify = {email: null};

        /**
         * Add this email to the list for this bathroom, so
         * they get a notification when a space is empty
        */

        $scope.notifySubmit = function(floorName, bathroomName){
            var email = $scope.notify.email;
            $scope.notify.email = "";
 
            var data = {
                "floor": floorName,
                "bathroom": bathroomName,
                "email": email
            };

            $http.post(notifyUrl, data);  
        };
    }
]);