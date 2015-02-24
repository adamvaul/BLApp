'use strict';

/* Controllers */

var controllers = angular.module('myApp.controllers');

controllers.controller('TSClientsController', ['$scope', '$http', function($scope, $http) {
    var self = this;

    //Add variables for binding to the $scope
    $scope.data = [];
    
    //Grid Stuff
    $scope.myData = [
        {name: "Moroni", age: 50},
        {name: "Tiancum", age: 43},
        {name: "Jacob", age: 27},
        {name: "Nephi", age: 29},
        {name: "Enos", age: 34}
    ];
    var columnDefs = [
        {field:'_RecordNumber', displayName:'', width: 50},
        {field:'FileName', displayName:'File Name', width: 150},
        {field:'DecedentLastName', displayName:'Dec. Last Name', width: 150}
    ];
    $scope.gridOptions = { 
        data: 'data',
        columnDefs: columnDefs,
        filterOptions: {filterText: 'LastName:', useExternalFilter: false},
        showFilter: true
    };

    //Add handlers to the $scope
    $scope.generateDocument = function(){
        alert('here');
        
        $http({method: 'POST', url: 'http://10.0.0.6/BLWebAPI/api/test/generatedocument'}).
        success(function(data, status, headers, config) {
            var filePath = data;
            console.log(filePath);
            var exportHandlerURL = 'http://10.0.0.6/BLWebAPI/ExportFile.ashx';
            var url = exportHandlerURL + '?FilePath=' + filePath;
            window.open(url, '_self');
        }).
        error(function(data, status, headers, config) {
            alert('error');
        });
    };

    self.init = function(){
        self.getData();
    };

    self.getData = function(){
        $http({method: 'GET', url: 'http://10.0.0.6/BLWebAPI/api/ts/clients'}).
        success(function(data, status, headers, config) {
            for (var i = 0; i < data.length; i++){
                data[i]._RecordNumber = i + 1; 
            }
            $scope.data = data;
        }).
        error(function(data, status, headers, config) {
            alert('error');
        });
    };

    self.init();

}]);