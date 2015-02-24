'use strict';

/* Controllers */

var controllers = angular.module('myApp.controllers');

controllers.controller('TSStatusController', 
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
    $scope.testButtonClick = function () {
        if (utils.canProcess()) {
            alert('Test');
        }
    };
    
    //Set Active Links
    utils.setActiveLinks('TS', 'Status');
    
    //Set new TrustSettlementID
    $scope.TrustSettlementID = utils.setTrustSettlementID($routeParams.TrustSettlementID);
    
    //Variables
    var newID = -1;
    
    //Add variables for binding to the $scope
    $scope.data = {};  
    $scope.Settlements = [];
    $scope.SelectedSettlement = {};
    $scope.settlementEmptyOption = '';
    
    $scope.Settlement = {};  
    
    $scope.estimatedValue = 0;
    $scope.totalEstate = 0;
    
    $scope.Assets = [];
    var AssetsDateFields = ['RequestSent'];
    var AssetsBooleanFields = ['IsDone','FormsReceived'];
    $scope.ToDo = [];
    var ToDoDateFields = ['RequestSent','DateReceived'];
    var ToDoBooleanFields = ['IsDone'];
    
    
    $scope.settlementChanged = function () {
        //            console.log('changed');
        var TrustSettlementID = $scope.SelectedSettlement.TrustSettlementID;
        $scope.TrustSettlementID = TrustSettlementID;
        $location.search('TrustSettlementID', TrustSettlementID);
        utils.setTrustSettlementID(TrustSettlementID);
        self.getData();
    };
    
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
    
//    self.processAssets = function(items){
//        var totalEstate = 0;
//        var estimatedValue = 0;
//        for(var i = 0; i < items.length; i++){
//            var item = items[i];
//            if (item._AssetType == "Mortgage"){
//                totalEstate -= item.DODValue != null ? item.DODValue : null;;
//                estimatedValue -= item.EstimatedValue != null ? item.EstimatedValue : null;
//            }else{
//                totalEstate += item.DODValue != null ? item.DODValue : null;;
//                estimatedValue += item.EstimatedValue != null ? item.EstimatedValue : null;
//            }
//            if (item.IsDone === true){
//                item._IsDoneText = "Completed";
//            }else{
//                item._IsDoneText = "Pending";
//            }
//        }
//        
//        return {totalEstate: totalEstate, estimatedValue: estimatedValue};
//    }
    
    
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
        
        
        BLAPI.get('TrustSettlements/Status?TrustSettlementID=' + trustSettlementID, function (data) {

            var Settlements = data.Settlements;
            $scope.Settlements = Settlements;
            var TrustSettlementID = $scope.TrustSettlementID;
            if (TrustSettlementID != null) {
                var SelectedSettlement = _.find(Settlements, function (item) {
                    //Do only == since the TrustSettlementID routeParam is a string (e.g. '1')
                    return item.TrustSettlementID == TrustSettlementID;
                });
                if (SelectedSettlement != null){
                    $scope.SelectedSettlement = SelectedSettlement;
                }
            }            
            
            var Settlement = data.Settlement;
            if (Settlement != null){
                $scope.Settlement = Settlement;
                $scope.hasSettlement = true;
            }else{
                $scope.hasSettlement = false;
            }
            
            //ToDo
            var ToDo = data.ToDo;
            utils.createShadowDateProperties(ToDo, ToDoDateFields);
            utils.setBooleanProperties(ToDo, ToDoBooleanFields);
            self.processToDo(ToDo);
            $scope.ToDo = ToDo;
            
            //Assets
            var Assets = utils.getAssets(data);
            var assetsInfo = utils.processAssets(Assets, $scope.Settlement);
            $scope.assetsInfo = assetsInfo;
            
            $scope.Assets = Assets;
            
            //Data
            $scope.data = data;
            
            $scope.settlementEmptyOption = 'Please Select a Settlement';
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
            
//            utils.mergeShadowDateProperties(data.DecLifeInsurance, AssetsDateFields);
//            utils.mergeShadowDateProperties(data.ClientLifeInsurance, AssetsDateFields);
//            utils.mergeShadowDateProperties(data.DecIRA, AssetsDateFields);
//            utils.mergeShadowDateProperties(data.ClientIRA, AssetsDateFields);
//            utils.mergeShadowDateProperties(data.DecAnnuity, AssetsDateFields);
//            utils.mergeShadowDateProperties(data.ClientAnnuity, AssetsDateFields);
//            utils.mergeShadowDateProperties(data.MiscAsset, AssetsDateFields);
            
            BLAPI.post('TrustSettlements/EditAssets', data, function (data) {
                $rootScope.setMessage('Saved');
                self.getData();
            });
        }else{
            $rootScope.setMessage('Cannot save. Missing fields!', 'warning');
        }
    };
    
    //ToDo stuff
    $scope.ToDoGridOptions = { 
        data: 'ToDo',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [
            { field: '_IsDoneText', displayName: 'Done', width: 150, visible: false },
            { 
                field: '', 
                displayName: '', 
                enableCellEdit: false,
                sortable: false,
                groupable: false,
                width: 24,
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><i ng-click="deleteToDo(row.entity)" title="Delete To Do Item" class="link glyphicon glyphicon-remove"></i></div>' 
            },
            { 
                field: 'IsDone', 
                displayName: '', 
                width: 30,
                enableCellEdit: false,
                cellTemplate: '<div class="ngCellText" ng-class="{red: !row.entity.IsDone, green: row.entity.IsDone}"><input type="checkbox" style="margin: 5px;" ng-model="COL_FIELD" /></div>'
            },
            { 
                field: '_RequestSent', 
                displayName: 'Req. Sent', 
                width: 80,
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
            { field: 'ShortName', displayName: 'Description', width: 450 },
            { field: 'Notes', displayName: 'Notes', width: 587 },
        ],
        groups: ['_IsDoneText'],
        groupsCollapsedByDefault: false,
        sortInfo: { fields: ['_IsDoneText', 'TSToDoID'], directions: ['desc','asc'] },
        plugins: [new ngGridFlexibleHeightPlugin()]
    };
    $scope.addToDo = function(){
        if (utils.canProcess()) {
            $scope.ToDo.push(
                {
                    TSToDoID: newID--,
                    TrustSettlementID: $scope.TrustSettlementID,
                    _IsDoneText: 'Pending'
                }
            );
        }
    };
    $scope.deleteToDo = function(ToDo){
        if (utils.canProcess()) {
            var TSToDoID = ToDo.TSToDoID;
            if (TSToDoID > 0){
                var confirmDelete = confirm('Are you sure you want to delete the To Do Item.  Any unsaved changes will be lost?');
                if (confirmDelete){
                    var postData = ToDo;
                    BLAPI.post('TrustSettlements/ToDo?FilterType=Delete', postData, function (data) {
                        $rootScope.setMessage('To Do Item deleted');
                        self.getData();
                    });
                }
            }else {
                $scope.ToDo = _.pull($scope.ToDo, ToDo);
            }
        }
    };
    
                    
    //Assets
    $scope.assetGridOptions = { 
        data: 'Assets',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        enablePinning: true,
        columnDefs: [
            { field: '_IsDoneText', displayName: 'Done', width: 150, visible: false, pinnable: true },
            { field: 'OwnerType', displayName: 'Owner Type', width: 150, visible: false, pinnable: true },
            { field: '_AssetGroupLabel', displayName: 'Asset Type', width: 150, visible: false, pinnable: true },
            { field: '_AssetNumber', displayName: 'Asset Number', width: 150, visible: false, pinnable: true },
            { 
                field: 'IsDone', 
                displayName: '', 
                width: 30,
                enableCellEdit: false,
                pinnable: true,
                cellTemplate: '<div class="ngCellText" ng-class="{red: !row.entity.IsDone, green: row.entity.IsDone}"><input type="checkbox" style="margin: 5px;" ng-model="COL_FIELD" /></div>'
                //cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><input type="checkbox" style="margin: 5px;" ng-model="COL_FIELD" /></div>'
            },
            { field: 'ShortName', displayName: 'Short Name', width: 150, pinnable: true },
            { 
                field: '_RequestSent', 
                displayName: 'Req. Sent', 
                width: 78,
                enableCellEdit: false,
                cellTemplate: '<div ng-class="col.colIndex()"><input type="text" ui-date="uiDateOptions" class="ngCellDateInput" ng-model="COL_FIELD" /></div>'
            },
            { field: 'EstimatedValue', displayName: 'Estm. Value', width: 120, cellFilter: 'currency', cellClass: 'right' },
            { 
                field: 'OwnerTypeID', 
                displayName: 'Type', 
                width: 78,
                enableCellEdit: false,
                cellTemplate: '<div ng-class="col.colIndex()"><select ng-model="COL_FIELD" ng-options="i.OwnerTypeID as i.Name for i in data.OwnerTypes"><option value=""></option></select></div>'
            },
            { field: 'DODOwner', displayName: 'DOD Owner', width: 170 },
            { field: 'DODValue', displayName: 'DOD Value', width: 120, cellFilter: 'currency', cellClass: 'right' },
            { 
                field: 'FormsReceived', 
                displayName: 'Frms', 
                width: 45,
                enableCellEdit: false,
                cellTemplate: '<div ng-hide="row.entity._HideForms"><div class="ngCellText" ng-class="col.colIndex()"><input type="checkbox" style="margin: 5px;" ng-model="COL_FIELD" /></div></div><div ng-show="row.entity._HideForms">&nbsp;N/A</div>'
            },
            { field: 'PrimaryBeneficiary', displayName: 'Primary Bene.', width: 160 },
//            { field: 'ContingentBeneficiary', displayName: 'Cont. Bene.', width: 120 },
            { field: 'Notes', displayName: 'Notes', width: 300 },
            { field: 'InventoryNotes', displayName: 'Inventory Notes', width: 544 }
//            { field: 'Notes', displayName: 'Inventory Notes', width: 544 }
        ],
        groupsCollapsedByDefault: false,
        groups: ['OwnerType','_AssetGroupLabel'],
        sortInfo: { fields: ['OwnerTypeID', '_AssetNumber'], directions: ['asc', 'asc'] },
//        groups: ['_IsDoneText','_AssetGroupLabel'],
//        sortInfo: { fields: ['_IsDoneText', '_AssetNumber'], directions: ['desc', 'asc'] },
//        groups: ['_AssetGroupLabel'],
//        sortInfo: { fields: ['_AssetNumber'], directions: ['asc'] },
        plugins: [new ngGridFlexibleHeightPlugin()]
    };
    
    $scope.getInventory = function(){
        var postData = {
            TrustSettlementID: $scope.TrustSettlementID,
            FormFileName: '_MB Inventory Master.xlsx'
        };
        BLAPI.getDocument(postData);
    };
    
    //Always call initialize
    self.init();

}]);