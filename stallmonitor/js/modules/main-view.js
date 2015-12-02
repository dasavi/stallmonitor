'use strict';
var mainView = angular.module('mainView', ['firebase']);

mainView.controller('mainViewCtrl', ['$scope', '$firebaseObject',
    function($scope, $firebase) {
        var databaseRef = new Firebase("https://stallmonitor.firebaseio.com/"),
            syncObj = $firebase(databaseRef);

        $scope.floors = syncObj;

        //Log status
        databaseRef.on("value", function(snapshot) {
            console.log("Data updated:");
            console.log(snapshot.val());
        });
    }
]);