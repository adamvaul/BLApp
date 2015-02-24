'use strict';

/* Controllers */

var controllers = angular.module('myApp.controllers');

controllers.controller('TSAllStatusController', 
    ['$scope', 
     '$rootScope', 
     '$location', 
     '$routeParams', 
     '$timeout', 
     '$modal', 
     'BLAPI', 
     'utils', 
function ($scope, $rootScope, $location, $routeParams, $timeout, $modal, BLAPI, utils) {
    var self = this;

    //Testing
//    $scope.testButtonClick = function () {
//        if (utils.canProcess()) {
//            alert('Test');
//        }
//    };
    
    //Set Active Links
    utils.setActiveLinks('TS', 'AllStatus');
    
    //Variables
    var newID = -1;
    
    //Add variables for binding to the $scope
    $scope.data = {};
    $scope.Assets = [];
    var AssetsDateFields = ['RequestSent'];
    var AssetsBooleanFields = ['IsDone','FormsReceived'];
    var ToDoDateFields = ['RequestSent','DateReceived'];
    var ToDoBooleanFields = ['IsDone'];
    
    //ui.date
    $scope.uiDateOptions = {
        changeYear: true,
        changeMonth: true,
        yearRange: '1900:-0'
    };
    
    //Getting Initial data
    self.init = function () {
        self.addWatches();
        self.getData();
    };
    
    //Scope and Watches
    self.addWatches = function(){
    };
    
    
    self.processToDo = function(items){
        for(var i = 0; i < items.length; i++){
            var item = items[i];
            if (item.IsDone === true){
                item._IsDoneText = "Completed";
            }else{
                item._IsDoneText = "Pending";
            }
        }
    }
    
    self.getData = function () {
        //Get All data in one shot
        
        var trustSettlementID = $scope.TrustSettlementID;
        if (trustSettlementID == null){
            trustSettlementID = -1;
        }
        
        
        BLAPI.get('TrustSettlements/AllStatus', function (data) {
            //Assets
            var Assets = utils.getAssets(data);
            
            var ToDo = data.ToDo;
            if (ToDo && ToDo.length > 0){
                utils.createShadowDateProperties(ToDo, ToDoDateFields);
                utils.setBooleanProperties(ToDo, ToDoBooleanFields);
                for (var i = 0; i < ToDo.length; i++) {
                    var item = ToDo[i];
                    item._IsToDo = true;
                    item._AssetNumber = 0;
                    Assets.push(item);
                }
            }
            
//            var assetsInfo = utils.processAssets(Assets, $scope.Settlement);
//            $scope.totalEstate = assetsInfo.totalEstate;
//            $scope.estimatedValue = assetsInfo.estimatedValue;
            
            $scope.Assets = Assets;
            $scope.data = data;
        });
        
    };       
    
    //Other Handlers
    $scope.saveClick = function () { 
        if (utils.canProcess()){
//            alert('saving');
            self.save();
        }
    };
    
    
    self.save = function () { 
        var isValid = true;
        if (isValid) {
            var data = $scope.data;
            
            utils.mergeShadowDateProperties(data.ToDo, ToDoDateFields);
            
            utils.mergeShadowDateProperties(data.Vehicles, AssetsDateFields);
            utils.mergeShadowDateProperties(data.Properties, AssetsDateFields);
            utils.mergeShadowDateProperties(data.Mortgages, AssetsDateFields);
            utils.mergeShadowDateProperties(data.USBonds, AssetsDateFields);
            utils.mergeShadowDateProperties(data.MiscAsset, AssetsDateFields);
            
            utils.mergeAccountsDateProperties(data.Banks, AssetsDateFields);
            utils.mergeAccountsDateProperties(data.Brokers, AssetsDateFields);
            utils.mergeAccountsDateProperties(data.Stocks, AssetsDateFields);
            utils.mergeAccountsDateProperties(data.LifeInsurance, AssetsDateFields);
            utils.mergeAccountsDateProperties(data.IRA, AssetsDateFields);
            utils.mergeAccountsDateProperties(data.Annuity, AssetsDateFields);
            
            BLAPI.post('TrustSettlements/EditAssets', data, function (data) {
                $rootScope.setMessage('Saved');
                self.getData();
            });
        }else{
            $rootScope.setMessage('Cannot save. Missing fields!', 'warning');
        }
    };
    
    
    //Assets
    $scope.statusGridOptions = { 
        data: 'Assets',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [
//            { field: '_IsDoneText', displayName: 'Done', width: 150, visible: false },
//            { field: '_AssetGroupLabel', displayName: 'Asset Type', width: 150, visible: false },
            { field: 'FileDescription', displayName: 'Settlement Name', width: 150, visible: false },
            { field: '_AssetNumber', displayName: 'Asset Number', width: 150, visible: false },
            { 
                field: 'IsDone', 
                displayName: '', 
                width: 30,
                enableCellEdit: false,
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><input type="checkbox" style="margin: 5px;" ng-model="COL_FIELD" /></div>'
            },
            { field: 'ShortName', displayName: 'Short Name', width: 180 },
            { 
                field: '_RequestSent', 
                displayName: 'Req. Sent', 
                width: 78,
                enableCellEdit: false,
                cellTemplate: '<div ng-class="col.colIndex()"><input type="text" ui-date="uiDateOptions" class="ngCellDateInput" ng-model="COL_FIELD" /></div>'
            },
            { 
                field: '_DateReceived', 
                displayName: 'Date Rcvd', 
                width: 82,
                enableCellEdit: false,
                cellTemplate: '<div ng-class="col.colIndex()"><input type="text" ui-date="uiDateOptions" class="ngCellDateInput" ng-model="COL_FIELD" /></div>'
            },
            { field: 'EstimatedValue', displayName: 'Estm. Value', width: 120, cellFilter: 'currency', cellClass: 'right' },
            { 
                field: 'OwnerTypeID', 
                displayName: 'Type', 
                width: 75,
                enableCellEdit: false,
                cellTemplate: '<div ng-hide="row.entity._IsToDo" ng-class="col.colIndex()"><select ng-model="COL_FIELD" ng-options="i.OwnerTypeID as i.Name for i in data.OwnerTypes"><option value=""></option></select></div>'
            },
            { field: 'DODOwner', displayName: 'DOD Owner', width: 180 },
            { field: 'DODValue', displayName: 'DOD Value', width: 120, cellFilter: 'currency', cellClass: 'right' },
            { 
                field: 'FormsReceived', 
                displayName: 'Forms', 
                width: 55,
                enableCellEdit: false,
                cellTemplate: '<div ng-hide="row.entity._HideForms"><div class="ngCellText" ng-class="col.colIndex()"><input type="checkbox" style="margin: 5px;" ng-model="COL_FIELD" /></div></div><div ng-show="row.entity._HideForms">&nbsp;N/A</div>'
            },
            { field: 'Notes', displayName: 'Notes', width: 544 }
        ],
        groupsCollapsedByDefault: false,
        groups: ['FileDescription'],
        sortInfo: { fields: ['FileDescription','_AssetNumber'], directions: ['asc','asc'] },
//        groupsCollapsedByDefault: false,
//        groups: ['_IsDoneText','_AssetGroupLabel'],
//        sortInfo: { fields: ['_IsDoneText', '_AssetNumber'], directions: ['desc', 'asc'] },
//        groups: ['_AssetGroupLabel'],
//        sortInfo: { fields: ['_AssetNumber'], directions: ['asc'] },
        plugins: [new ngGridFlexibleHeightPlugin()]
    };
    
//    $scope.getInventory = function(){
//        var postData = {
//            TrustSettlementID: $scope.TrustSettlementID,
//            FormFileName: '_MB Inventory Master.xlsx'
//        };
//        BLAPI.getDocument(postData);
//    };
    
    //Always call initialize
    self.init();

}]);