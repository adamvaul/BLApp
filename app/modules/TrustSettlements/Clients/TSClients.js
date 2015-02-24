'use strict';

/* Controllers */

var controllers = angular.module('myApp.controllers');

controllers.controller('TSClientsController', ['$scope', '$location', '$timeout', 'BLAPI', 'utils', function ($scope, $location, $timeout, BLAPI, utils) {
    var self = this;

    //Set Active Links
    utils.setActiveLinks('TS', 'Clients');
    
    //Add variables for binding to the $scope
    $scope.data = [];
    $scope.showNewSettlement = false;
    $scope.duplicateText = 'Hello';
    var settlementDateFields = ['DateRetained'];
    $scope.newSettlement = {
        TrustSettlementID: -1,
        DecedentFirstName: null,
        DecedentMiddleName: null,
        DecedentLastName: null,
        DateOfDeath: null, //This one will be saved
        _DateOfDeath: null
    };
    
    $scope.uiDateOptions = {
        changeYear: true,
        changeMonth: true,
        yearRange: '1900:-0'
    }

    //Grid Stuff
    var columnDefs = [
        { 
            field: '_DateRetained', 
            displayName: 'Retained', 
            width: 85,
            enableCellEdit: false,
            cellTemplate: '<div ng-class="col.colIndex()"><input type="text" ui-date="uiDateOptions" class="ngCellDateInput" ng-model="COL_FIELD" /></div>'
        },
        { field: 'FileName', displayName: 'File Name', width: 150 },
        { field: 'DecedentLastName', displayName: 'Decedent Last Name', width: 180 },
        { field: 'DecedentFirstName', displayName: 'Decedent First Name', width: 180 },
        { 
            field: 'TrustSettlementID', 
            displayName: 'Status', 
            width: 60,
            cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()">' + 
            '<a href="#/TrustSettlements/Status?TrustSettlementID={{row.getProperty(col.field)}}">Status</a>' +
            '</div>' 
        },        
        { 
            field: 'TrustSettlementID', 
            displayName: 'Edit', 
            width: 45,
            cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()">' + 
            '<a href="#/TrustSettlements/Edit?TrustSettlementID={{row.getProperty(col.field)}}">Edit</a>' +
            '</div>' 
        },
        { 
            field: 'TrustSettlementID', 
            displayName: 'Assets', 
            width: 60,
            cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()">' + 
            '<a href="#/TrustSettlements/Assets?TrustSettlementID={{row.getProperty(col.field)}}">Assets</a>' +
            '</div>' 
        },
        { 
            field: 'TrustSettlementID', 
            displayName: 'Docs', 
            width: 50,
            cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()">' + 
            '<a href="#/TrustSettlements/Documents?TrustSettlementID={{row.getProperty(col.field)}}">Docs</a>' + 
            '</div>' 
        }
    ];
    $scope.filterOptions = {
        filterText: '',
        filterColumn: 'DecedentLastName',
        useExternalFilter: false
    };
    
    $scope.gridOptions = {
        data: 'data',
        columnDefs: columnDefs,
        filterOptions: $scope.filterOptions
    };


    //Add handlers to the $scope
    $scope.generateDocument = function () {
        console.log('here');

        $http({
            method: 'POST',
            url: 'http://10.0.0.6/BLAPI/api/test/generatedocument'
        }).
        success(function (data, status, headers, config) {
            var filePath = data;
            console.log(filePath);
            var exportHandlerURL = 'http://10.0.0.6/BLAPI/ExportFile.ashx';
            var url = exportHandlerURL + '?FilePath=' + filePath;
            window.open(url, '_self');
        }).
        error(function (data, status, headers, config) {
            console.log('error');
        });
    };
    
    self.isSettlementValid = function(newSettlement){
        return utils.hasValidTextFields(newSettlement, ['FileName', 'DecedentLastName', 'DecedentFirstName']);
    };

    $scope.createNewSettlement = function(){
        if (utils.canProcess()){
            var newSettlement = $scope.newSettlement;
            newSettlement.DateOfDeath = utils.formatURLDate(newSettlement._DateOfDeath);
            if (self.isSettlementValid(newSettlement)){
                console.log('creating new settlement');
                BLAPI.post('TrustSettlements/NewSettlement', newSettlement, function(data){
                    console.log(data);
                    var TrustSettlementID = data.TrustSettlementID;
                    $location.path('/TrustSettlements/Edit?TrustSettlementID=' + TrustSettlementID);
                });
            }
        }
    };

//    self.isNewSettlementValid = function(){
//        var newSettlement = $scope.newSettlement;
//        
//        return utils.hasValidFields(newSettlement, ['DecedentLastName', 'DecedentFirstName', 'DateOfDeath']);
//        
////        if (newSettlement.DecedentLastName == null || newSettlement.DecedentLastName === ''){
////            return false;
////        } else if (newSettlement.DecedentFirstName == null || newSettlement.DecedentFirstName === ''){
////            return false;
////        }else if (newSettlement.DateOfDeath == null || newSettlement.DecedentFirstName === ''){
////            return false;
////        }else{
////            return true;
////        }
//    };

    self.init = function () {
        self.addWatches();
        self.getData();
    };

    self.addWatches = function () {
        $scope.$watch('filterOptions.filterText', function (newValue, oldValue) {
            $timeout(function () {
                $scope.newSettlement.DecedentLastName = newValue;
                if (newValue && newValue.length > 0) {
                    var rowCount = $scope.gridOptions.ngGrid.filteredRows.length;
                    if (rowCount > 0) {
                        $scope.duplicateText = "There are " + rowCount + " client(s) that match!";
                    } else {
                        $scope.duplicateText = null;
                    }
                } else {
                    $scope.duplicateText = null;
                }
            }, 0);
        });
    };
    
    self.getData = function () {
        var data = BLAPI.get('TrustSettlements/Settlements?FilterType=All', function (data) {
            utils.createShadowDateProperties(data, settlementDateFields);
            //add 1000 rows
//            for (var i = 0; i < 10000; i++){
//                data.push({DecedentLastName: "Shmo" + i});
//            }
            $scope.data = data;
        });
    };

    self.init();

}]);