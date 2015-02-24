'use strict';

/* Controllers */

var controllers = angular.module('myApp.controllers');

controllers.controller('WTClientsController', ['$scope', '$rootScope', '$http', 'BLAPI', 'utils',
    function ($scope, $rootScope, $http, BLAPI, utils) {
        var self = this;

        //Set Active Links
        utils.setActiveLinks('WT', 'Clients');

        //Add variables for binding to the $scope
        $scope.data = [];

        //Grid Stuff
        var columnDefs = [
            {
                field: 'LastName',
                displayName: 'Last Name',
                width: 150
            },
            {
                field: 'FirstName',
                displayName: 'First Name',
                width: 150
            },
            {
                field: 'FileName',
                displayName: 'File Name',
                width: 381
            }
        ];
        $scope.filterOptions = {
            filterText: "",
            filterColumn: "LastName",
            useExternalFilter: false
        };
        $scope.gridOptions = {
            data: 'data',
            columnDefs: columnDefs,
            filterOptions: $scope.filterOptions
        };

        //Add handlers to the $scope
        $scope.generateDocument = function () {
            alert('here');

            $http({
                method: 'POST',
                url: 'http://10.0.0.6/BLAPI/api/test/generatedocument'
            }).
            success(function (data, status, headers, config) {
                var filePath = data;
                console.log(filePath);
                var exportHandlerURL = 'http://10.0.0.6/BLWebAPI/ExportFile.ashx';
                var url = exportHandlerURL + '?FilePath=' + filePath;
                window.open(url, '_self');
            }).
            error(function (data, status, headers, config) {
                alert('error');
            });
        };

        self.init = function () {
            self.getData();
        };

        self.getData = function () {
            BLAPI.get('WillsTrusts/Clients', function (data) {
                $scope.data = data;
            });
            
            //            $http({
            //                method: 'GET',
            //                url: 'http://10.0.0.6/BLAPI/api/WillsTrusts/Clients'
            //            }).
            //            success(function (data, status, headers, config) {
            //                for (var i = 0; i < data.length; i++) {
            //                    data[i]._RecordNumber = i + 1;
            //                }
            //                $scope.data = data;
            //            }).
            //            error(function (data, status, headers, config) {
            //                alert('error');
            //            });
        };

        self.init();

}]);