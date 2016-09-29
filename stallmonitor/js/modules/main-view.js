'use strict';
var mainView = angular.module('mainView', ['firebase', 'ngMaterial','configuration']).config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('orange');
});
var notifyEndpoint = "/notify";

mainView.controller('mainViewCtrl', ['$scope', '$firebaseObject', '$http', 'DB_URL',
    function($scope, $firebase, $http, DB_URL) {
        
        var databaseRef = new Firebase(DB_URL),
            syncObj = $firebase(databaseRef);

        $scope.floors = syncObj;

        //Log status
        databaseRef.on("value", function(snapshot) {
            console.log("Data updated:");
            console.log(snapshot.val());
        });
        
        $scope.showCredits = false;
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

            $http.post(notifyEndpoint, data);  
        };

        $scope.stallClicked = function(event, stall) {
            alert("Stall " + stall + " Clicked!");
        };
    }
]);