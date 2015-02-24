'use strict';

/* Controllers */

var controllers = angular.module('myApp.controllers');

controllers.controller('EditTSAssetsController', 
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
//            alert('here');

            var postData = {
                TSStockID: 1
            };
            BLAPI.post('TrustSettlements/Stock?FilterType=Update', postData, function (data) {
                $rootScope.setMessage('Stock deleted');
                self.getData();
            });
            
//            var postData = {
//                FilterType: 'Delete',
//                TSStockID: 1
//            };
//            BLAPI.post('TrustSettlements/Stock', postData, function (data) {
//                $rootScope.setMessage('Stock deleted');
//                self.getData();
//            });

        }
    };
    
    
    
    //Set Active Links
    utils.setActiveLinks('TS', 'Assets');
    
    //Set new TrustSettlementID
    $scope.TrustSettlementID = utils.setTrustSettlementID($routeParams.TrustSettlementID);
    
    //Variables
    var newID = -1;
    
    self.processing = false;
    
    //Testing
    $scope.myDate = new Date();
    $scope.myValue = null;
    
    //Add variables for binding to the $scope
    $scope.data = {};    
    $scope.Settlements = [];
    $scope.settlementEmptyOption = '';
    $scope.Settlement = {};
    $scope.hasSettlement = false;
    var settlementDateFields = ['Birthdate', 'DateOfDeath','DateOfTrust'];
    
    var AssetsDateFields = ['RequestSent'];
    var AssetsBooleanFields = ['IsDone','FormsReceived'];
    
    $scope.Vehicles = {};
    $scope.Properties = {};
    var PropertiesDateFields = ['LastDeedExecuted','LastDeedRecorded'];
    var PropertiesBooleanFields = ['DoAppraisal'];
    $scope.Mortgages = {};
    var MortgagesDateFields = [];
    $scope.Banks = [];
    $scope.Brokers = [];
    $scope.Stocks = [];
    $scope.USBonds = [];
    $scope.OwnerTypes = [{
            "OwnerTypeID": 1,
            "Name": "Trust"
        }, {
            "OwnerTypeID": 2,
            "Name": "Other"
        }, {
            "OwnerTypeID": 3,
            "Name": "Trust B"
        }, {
            "OwnerTypeID": 4,
            "Name": "Trust C"
        }
    ];
    
    $scope.MiscAsset = [];
    
    $scope.showBankAccounts = false;
    $scope.showBrokerAccounts = false;
    $scope.showStockAccounts = false;
    
    
    $scope.settlementChanged = function () {
        //            console.log('changed');
        var TrustSettlementID = $scope.Settlement.TrustSettlementID;
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
    
    //Grid
    $scope.vehicleGridOptions = { 
        data: 'Vehicles',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [
            { 
                field: '', 
                displayName: '', 
                enableCellEdit: false,
                sortable: false,
                groupable: false,
                width: 24,
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><i ng-click="deleteVehicle(row.entity)" title="Delete Vehicle" class="link glyphicon glyphicon-remove"></i></div>' 
            },
            { 
                field: 'IsDone', 
                displayName: '', 
                width: 30,
                enableCellEdit: false,
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><input type="checkbox" style="margin: 5px;" ng-model="COL_FIELD" /></div>'
            },
            { field: 'ShortName', displayName: 'Short Name', width: 250 },
            { field: 'EstimatedValue', displayName: 'Estm. Value', width: 120, cellFilter: 'currency', cellClass: 'right' },
            { 
                field: 'OwnerTypeID', 
                displayName: 'Type', 
                width: 78,
                enableCellEdit: false,
                cellTemplate: '<div ng-class="col.colIndex()"><select ng-model="COL_FIELD" ng-options="i.OwnerTypeID as i.Name for i in OwnerTypes"><option value=""></option></select></div>'
            },
            { field: 'DODOwner', displayName: 'DOD Owner', width: 180 },
            { field: 'DODValue', displayName: 'DOD Value', width: 120, cellFilter: 'currency', cellClass: 'right' },
            { field: 'VehicleYear', displayName: 'Year', width: 100 },
            { field: 'Make', displayName: 'Make', width: 180 },
            { field: 'Model', displayName: 'Model', width: 150 },
            { field: 'Mileage', displayName: 'Mileage', width: 150, cellFilter: 'number', cellClass: 'right' },
            { field: 'Notes', displayName: 'Notes', width: 450 }
        ],
        plugins: [new ngGridFlexibleHeightPlugin()]
    };
    
    $scope.propertyGridOptions = { 
        data: 'Properties',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [
            { 
                field: '', 
                displayName: '', 
                enableCellEdit: false,
                sortable: false,
                groupable: false,
                width: 24,
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><i ng-click="deleteProperty(row.entity)" title="Delete Property" class="link glyphicon glyphicon-remove"></i></div>' 
            },
            { 
                field: 'IsDone', 
                displayName: '', 
                width: 30,
                enableCellEdit: false,
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><input type="checkbox" style="margin: 5px;" ng-model="COL_FIELD" /></div>'
            },
            { field: 'ShortName', displayName: 'Short Name', width: 200 },
            { field: 'EstimatedValue', displayName: 'Estm. Value', width: 120, cellFilter: 'currency', cellClass: 'right' },
            { 
                field: 'OwnerTypeID', 
                displayName: 'Type', 
                width: 78,
                enableCellEdit: false,
                cellTemplate: '<div ng-class="col.colIndex()"><select ng-model="COL_FIELD" ng-options="i.OwnerTypeID as i.Name for i in OwnerTypes"><option value=""></option></select></div>'
            },
            { field: 'DODOwner', displayName: 'DOD Owner', width: 180 },
            { field: 'DODValue', displayName: 'DOD Value', width: 150, cellFilter: 'currency' },
//            { 
//                field: 'DoAppraisal', 
//                displayName: 'Appraise', 
//                width: 78,
//                enableCellEdit: false,
//                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><input type="checkbox" style="margin: 5px;" ng-model="COL_FIELD" /></div>'
//            },
            { field: 'StreetAddress', displayName: 'Address', width: 180 },
            { field: 'City', displayName: 'City', width: 150 },
            { field: 'State', displayName: 'State', width: 50 },
            { field: 'Zip', displayName: 'Zip', width: 100 },
            { field: 'County', displayName: 'County', width: 120 },
            { field: 'APN', displayName: 'APN', width: 260 },
            { field: 'PropertyType', displayName: 'Property Type', width: 220 },
            { 
                field: '_LastDeedExecuted', 
                displayName: 'Last Deed Executed', 
                width: 150,
                enableCellEdit: false,
                cellTemplate: '<div ng-class="col.colIndex()"><input type="text" ui-date="uiDateOptions" class="ngCellDateInput" ng-model="COL_FIELD" /></div>'
//                cellTemplate: '<div ng-class="col.colIndex()" style="position: relative;"><input type="text" datepicker-popup class="datepicker-popup" ng-model="COL_FIELD" /></div>'
            },
            { field: 'LastDeedDocumentNumber', displayName: 'Last Deed Doc Number', width: 200 },
            { 
                field: '_LastDeedRecorded', 
                displayName: 'Last Deed Recorded', 
                width: 160,
                enableCellEdit: false,
                cellTemplate: '<div ng-class="col.colIndex()"><input type="text" ui-date="uiDateOptions" class="ngCellDateInput" ng-model="COL_FIELD" /></div>'
            },
            {
                field: 'LegalDescription', 
                displayName: 'Legal Description', 
                width: 300,
                enableCellEdit: false,
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()" ng-click="editPropertyDescriptionClick(row.entity)"><span class="ng-binding">{{COL_FIELD}}</span></div>'
            },
            { field: 'FinalOwner', displayName: 'Final Owner', width: 300 },
            { field: 'Notes', displayName: 'Notes', width: 450 }
        ],
        plugins: [new ngGridFlexibleHeightPlugin()]
    };
    
    
    $scope.mortgageGridOptions = { 
        data: 'Mortgages',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [
            { 
                field: '', 
                displayName: '', 
                enableCellEdit: false,
                sortable: false,
                groupable: false,
                width: 24,
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><i ng-click="deleteMortgage(row.entity)" title="Delete Mortgage" class="link glyphicon glyphicon-remove"></i></div>' 
            },
            { 
                field: 'IsDone', 
                displayName: '', 
                width: 30,
                enableCellEdit: false,
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><input type="checkbox" style="margin: 5px;" ng-model="COL_FIELD" /></div>'
            },
            { field: 'ShortName', displayName: 'Short Name', width: 200 },     
            { 
                field: 'TSPropertyID', 
                displayName: 'Property', 
                width: 150,
                enableCellEdit: false,
                cellTemplate: '<div ng-class="col.colIndex()"><select ng-model="COL_FIELD" ng-options="i.TSPropertyID as i.ShortName for i in data.Properties"><option value=""></option></select></div>'
            },
            { field: 'EstimatedValue', displayName: 'Estm. Value', width: 120, cellFilter: 'currency', cellClass: 'right' },
            { field: 'DODValue', displayName: 'DOD Balance', width: 150, cellFilter: 'currency' },
            { field: 'AccountNumber', displayName: 'Account No.', width: 150 },
            { field: 'CompanyName', displayName: 'Company', width: 250 },
            { field: 'StreetAddress', displayName: 'Address', width: 200 },
            { field: 'City', displayName: 'City', width: 150 },
            { field: 'State', displayName: 'State', width: 50 },
            { field: 'Zip', displayName: 'Zip', width: 100 },
            { field: 'Country', displayName: 'Country (if not USA)', width: 150 },
            { field: 'ContactName', displayName: 'Contact Name', width: 150 },
            { field: 'Phone', displayName: 'Phone', width: 170 },
            { field: 'Fax', displayName: 'Fax', width: 120 },
            { field: 'Email', displayName: 'Email', width: 200 },
            { field: 'Notes', displayName: 'Notes', width: 450 }
        ],
        plugins: [new ngGridFlexibleHeightPlugin()]
    };
    
    $scope.bankGridOptions = { 
        data: 'Banks',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [
            { 
                field: '', 
                displayName: '', 
                enableCellEdit: false,
                sortable: false,
                groupable: false,
                width: 24,
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><i ng-click="deleteBank(row.entity)" title="Delete Bank" class="link glyphicon glyphicon-remove"></i></div>' 
            },
            { field: 'ShortName', displayName: 'Short Name', width: 180 },
            { field: 'CompanyName', displayName: 'Name', width: 250 },
            { field: 'StreetAddress', displayName: 'Address', width: 200 },
            { field: 'City', displayName: 'City', width: 150 },
            { field: 'State', displayName: 'State', width: 50 },
            { field: 'Zip', displayName: 'Zip', width: 100 },
            { field: 'Country', displayName: 'Country (if not USA)', width: 150 },
            { field: 'ContactName', displayName: 'Contact Name', width: 150 },
            { field: 'Phone', displayName: 'Phone', width: 170 },
            { field: 'Fax', displayName: 'Fax', width: 120 },
            { field: 'Email', displayName: 'Email', width: 200 },
            { field: 'Notes', displayName: 'Notes', width: 450 }
        ],
        plugins: [new ngGridFlexibleHeightPlugin()]
    };
    
    $scope.brokerGridOptions = { 
        data: 'Brokers',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [
            { 
                field: '', 
                displayName: '', 
                enableCellEdit: false,
                sortable: false,
                groupable: false,
                width: 24,
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><i ng-click="deleteBroker(row.entity)" title="Delete Broker" class="link glyphicon glyphicon-remove"></i></div>' 
            },
            { field: 'ShortName', displayName: 'Short Name', width: 250 },
            { field: 'CompanyName', displayName: 'Broker Name', width: 200 },
            { field: 'StreetAddress', displayName: 'Address', width: 200 },
            { field: 'City', displayName: 'City', width: 150 },
            { field: 'State', displayName: 'State', width: 50 },
            { field: 'Zip', displayName: 'Zip', width: 100 },
            { field: 'Country', displayName: 'Country (if not USA)', width: 150 },
            { field: 'ContactName', displayName: 'Contact Name', width: 150 },
            { field: 'Phone', displayName: 'Phone', width: 170 },
            { field: 'Fax', displayName: 'Fax', width: 120 },
            { field: 'Email', displayName: 'Email', width: 200 },
            { field: 'Notes', displayName: 'Notes', width: 450 }        
        ],
        plugins: [new ngGridFlexibleHeightPlugin()]
    };
    
    $scope.stockGridOptions = { 
        data: 'Stocks',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [
            { 
                field: '', 
                displayName: '', 
                enableCellEdit: false,
                sortable: false,
                groupable: false,
                width: 24,
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><i ng-click="deleteStock(row.entity)" title="Delete Stock" class="link glyphicon glyphicon-remove"></i></div>' 
            },
            { field: 'ShortName', displayName: 'Short Name', width: 250 },
            { field: 'StockName', displayName: 'Stock Name', width: 200 },
            { field: 'Cusip', displayName: 'Symbol/Cusip', width: 120 },
            { field: 'CompanyName', displayName: 'Transfer Agent', width: 200 },
            { field: 'StreetAddress', displayName: 'Address', width: 200 },
            { field: 'City', displayName: 'City', width: 150 },
            { field: 'State', displayName: 'State', width: 50 },
            { field: 'Zip', displayName: 'Zip', width: 100 },
            { field: 'Country', displayName: 'Country (if not USA)', width: 150 },
            { field: 'ContactName', displayName: 'Contact Name', width: 150 },
            { field: 'Phone', displayName: 'Phone', width: 170 },
            { field: 'Fax', displayName: 'Fax', width: 120 },
            { field: 'Email', displayName: 'Email', width: 200 },
            { field: 'Notes', displayName: 'Notes', width: 450 }
        ],
        plugins: [new ngGridFlexibleHeightPlugin()]
    };
    
    $scope.getBankAccountGridOptions = function(){
        return {
            data: 'b._Accounts',
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEditOnFocus: true,
            columnDefs: [
                { 
                    field: '', 
                    displayName: '', 
                    enableCellEdit: false,
                    sortable: false,
                    groupable: false,
                    width: 24,
                    cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><i ng-click="deleteBankAccount(b, row.entity)" title="Delete Bank Account" class="link glyphicon glyphicon-remove"></i></div>' 
                },
                { 
                    field: 'IsDone', 
                    displayName: '', 
                    width: 30,
                    enableCellEdit: false,
                    cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><input type="checkbox" style="margin: 5px;" ng-model="COL_FIELD" /></div>'
                },
                { field: 'AccountNumber', displayName: 'Account Number', width: 170 },
                { field: 'AccountType', displayName: 'Acct. Type', width: 100 },
                { field: 'EstimatedValue', displayName: 'Estm. Value', width: 120, cellFilter: 'currency', cellClass: 'right' },
                { 
                    field: 'OwnerTypeID', 
                    displayName: 'Type', 
                    width: 78,
                    enableCellEdit: false,
                    cellTemplate: '<div ng-class="col.colIndex()"><select ng-model="COL_FIELD" ng-options="i.OwnerTypeID as i.Name for i in OwnerTypes"><option value=""></option></select></div>'
                },
			    { field: 'DODOwner', displayName: 'DOD Owner', width: 180 },
                { field: 'DODValue', displayName: 'DOD Value', width: 120, cellFilter: 'currency', cellClass: 'right' },
                { field: 'DODPrincipal', displayName: 'Principal', width: 120, cellFilter: 'currency', cellClass: 'right' },
                { field: 'DODInterest', displayName: 'Interest', width: 120, cellFilter: 'currency', cellClass: 'right' },
                { field: 'ShortName', displayName: 'Short Name', width: 250 },
                { field: 'Notes', displayName: 'Notes', width: 450 }
//                { field: 'AccountOwner', displayName: 'Account Owner', width: 250 },
//                { field: 'DODValue', displayName: 'DOD Value', width: 170, cellFilter: 'currency' }
            ],
            plugins: [new ngGridFlexibleHeightPlugin()]
        };
    };
    
    $scope.getBrokerAccountGridOptions = function(){
        return {
            data: 'b._Accounts',
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEditOnFocus: true,
            columnDefs: [
                { 
                    field: '', 
                    displayName: '', 
                    enableCellEdit: false,
                    sortable: false,
                    groupable: false,
                    width: 24,
                    cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><i ng-click="deleteBrokerAccount(b, row.entity)" title="Delete Broker Account" class="link glyphicon glyphicon-remove"></i></div>' 
                },
                { 
                    field: 'IsDone', 
                    displayName: '', 
                    width: 30,
                    enableCellEdit: false,
                    cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><input type="checkbox" style="margin: 5px;" ng-model="COL_FIELD" /></div>'
                },
                { field: 'AccountNumber', displayName: 'Account Number', width: 170 },
                { field: 'EstimatedValue', displayName: 'Estm. Value', width: 120, cellFilter: 'currency', cellClass: 'right' },
                { 
                    field: 'OwnerTypeID', 
                    displayName: 'Type', 
                    width: 78,
                    enableCellEdit: false,
                    cellTemplate: '<div ng-class="col.colIndex()"><select ng-model="COL_FIELD" ng-options="i.OwnerTypeID as i.Name for i in OwnerTypes"><option value=""></option></select></div>'
                },
			    { field: 'DODOwner', displayName: 'DOD Owner', width: 180 },
                { field: 'DODValue', displayName: 'DOD Value', width: 120, cellFilter: 'currency', cellClass: 'right' },
                { field: 'AccountType', displayName: 'Account Type', width: 150 },
                { field: 'ShortName', displayName: 'Short Name', width: 250 },
                { field: 'Notes', displayName: 'Notes', width: 450 }
            ],
            plugins: [new ngGridFlexibleHeightPlugin()]
        };
    };
    
    
    $scope.getStockAccountGridOptions = function(){
        return {
            data: 'b._Accounts',
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEditOnFocus: true,
            columnDefs: [
                { 
                    field: '', 
                    displayName: '', 
                    enableCellEdit: false,
                    sortable: false,
                    groupable: false,
                    width: 24,
                    cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><i ng-click="deleteStockAccount(b, row.entity)" title="Delete Broker Account" class="link glyphicon glyphicon-remove"></i></div>' 
                },
                { 
                    field: 'IsDone', 
                    displayName: '', 
                    width: 30,
                    enableCellEdit: false,
                    cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><input type="checkbox" style="margin: 5px;" ng-model="COL_FIELD" /></div>'
                },
                { field: 'AccountNumber', displayName: 'Account Number', width: 170 },
                { field: 'EstimatedValue', displayName: 'Estm. Value', width: 120, cellFilter: 'currency', cellClass: 'right' },
                { 
                    field: 'OwnerTypeID', 
                    displayName: 'Type', 
                    width: 78,
                    enableCellEdit: false,
                    cellTemplate: '<div ng-class="col.colIndex()"><select ng-model="COL_FIELD" ng-options="i.OwnerTypeID as i.Name for i in OwnerTypes"><option value=""></option></select></div>'
                },
			    { field: 'DODOwner', displayName: 'DOD Owner', width: 180 },
                { field: 'DODValue', displayName: 'DOD Value', width: 120, cellFilter: 'currency', cellClass: 'right' },
                { field: 'ShortName', displayName: 'Short Name', width: 250 },
                { field: 'DODNumberShares', displayName: 'DOD No Shares', width: 120 },
                { field: 'DODPricePerShare', displayName: 'DOD $/Share', width: 100 },
                { field: 'Notes', displayName: 'Notes', width: 450 }
            ],
            plugins: [new ngGridFlexibleHeightPlugin()]
        };
    };
    
    //LifeInsurance stuff
    $scope.LifeInsurance = [];
    $scope.LifeInsuranceAccountGridOptions = [];
    var LifeInsuranceAccountBooleanFields = ['IsClients'];
    $scope.showLifeInsuranceAccounts = false;
    
    $scope.LifeInsuranceGridOptions = { 
        data: 'LifeInsurance',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [
            { 
                field: '', 
                displayName: '', 
                enableCellEdit: false,
                sortable: false,
                groupable: false,
                width: 24,
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><i ng-click="deleteLifeInsurance(row.entity)" title="Delete Dec. Life Insurance" class="link glyphicon glyphicon-remove"></i></div>' 
            },
            { field: 'ShortName', displayName: 'Short Name', width: 250 },
            { field: 'CompanyName', displayName: 'Company', width: 200 },
            { field: 'StreetAddress', displayName: 'Address', width: 170 },
            { field: 'City', displayName: 'City', width: 150 },
            { field: 'State', displayName: 'State', width: 50 },
            { field: 'Zip', displayName: 'Zip', width: 100 },
            { field: 'Country', displayName: 'Country (if not USA)', width: 150 },
            { field: 'ContactName', displayName: 'Contact Name', width: 150 },
            { field: 'Phone', displayName: 'Phone', width: 170 },
            { field: 'Fax', displayName: 'Fax', width: 120 },
            { field: 'Email', displayName: 'Email', width: 200 },
            { field: 'Notes', displayName: 'Notes', width: 544 }
        ],
        plugins: [new ngGridFlexibleHeightPlugin()]
    };
    
    $scope.addLifeInsurance = function(){
        if (utils.canProcess()){
            var data = {InstitutionTypeID:4};
            self.openModal(
                'Life Insurance', 
                'modules/TrustSettlements/Modals/AddBankModal.html', 
                AddBankModalController, 
                data, 
                function(data){ 
                    var SelectedItems = data.SelectedItems;
                    for (var i = 0; i < SelectedItems.length; i++) {
                        var item = SelectedItems[i];
                        item.TSLifeInsuranceID = newID--;
                        item.TrustSettlementID = $scope.TrustSettlementID;
                        $scope.LifeInsurance.push(item);
                    }
                    self.saveSettlement();
                }
            );
        }
    };
    
//    $scope.addLifeInsurance = function(){
//        if (utils.canProcess()) {
//            $scope.LifeInsurance.push(
//                {
//                    TSLifeInsuranceID: newID--,
//                    TrustSettlementID: $scope.TrustSettlementID
//                }
//            );
//        }
//    };
    $scope.deleteLifeInsurance = function(LifeInsurance){
        if (utils.canProcess()) {
            var TSLifeInsuranceID = LifeInsurance.TSLifeInsuranceID;
            if (TSLifeInsuranceID > 0){
                var confirmDelete = confirm('Are you sure you want to delete the Life Insurance? Any unsaved changes will be lost.');
                if (confirmDelete){
                    var postData = LifeInsurance;
                    BLAPI.post('TrustSettlements/LifeInsurance?FilterType=Delete', postData, function (data) {
                        $rootScope.setMessage('Life Insurance deleted');
                        self.getData();
                    });
                }
            }else {
                $scope.LifeInsurance = _.pull($scope.LifeInsurance, LifeInsurance);
            }
        }
    };
    $scope.getLifeInsuranceAccountGridOptions = function(){
        return {
            data: 'b._Accounts',
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEditOnFocus: true,
            columnDefs: [
                { 
                    field: '', 
                    displayName: '', 
                    enableCellEdit: false,
                    sortable: false,
                    groupable: false,
                    width: 24,
                    cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><i ng-click="deleteLifeInsuranceAccount(b, row.entity)" title="Delete Life Insurance Account" class="link glyphicon glyphicon-remove"></i></div>' 
                },
                { 
                    field: 'IsDone', 
                    displayName: '', 
                    width: 30,
                    enableCellEdit: false,
                    cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><input type="checkbox" style="margin: 5px;" ng-model="COL_FIELD" /></div>'
                },
                { 
                    field: 'IsClients', 
                    displayName: 'Clients', 
                    width: 60,
                    enableCellEdit: false,
                    cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><input type="checkbox" style="margin: 5px;" ng-model="COL_FIELD" /></div>'
                },
                { field: 'AccountNumber', displayName: 'Policy Number', width: 190 },
                { field: 'EstimatedValue', displayName: 'Estm. Value', width: 120, cellFilter: 'currency', cellClass: 'right' },
                { field: 'AccountType', displayName: 'Policy Type', width: 150 },
                { 
                    field: 'OwnerTypeID', 
                    displayName: 'Type', 
                    width: 78,
                    enableCellEdit: false,
                    cellTemplate: '<div ng-class="col.colIndex()"><select ng-model="COL_FIELD" ng-options="i.OwnerTypeID as i.Name for i in OwnerTypes"><option value=""></option></select></div>'
                },
			    { field: 'DODOwner', displayName: 'DOD Owner', width: 180 },
                { field: 'DODValue', displayName: 'DOD Value', width: 120, cellFilter: 'currency', cellClass: 'right' },
                { field: 'ShortName', displayName: 'Short Name', width: 250 },
                { field: 'Insured', displayName: 'Insured', width: 170 },
                { field: 'PrimaryBeneficiary', displayName: 'Primary Beneficiary', width: 170 },
                { field: 'ContigentBeneficiary', displayName: 'Contigent Beneficiary', width: 170 },
                { field: 'CurrentCashOutValue', displayName: 'Current Cash-Out Value', width: 180, cellFilter: 'currency', cellClass: 'right' },
                { field: 'DeathPayOffAmount', displayName: 'Death Pay Off Amt', width: 180, cellFilter: 'currency', cellClass: 'right' },
                { field: 'Notes', displayName: 'Notes', width: 450 }
            ],
            plugins: [new ngGridFlexibleHeightPlugin()]
        };
    };
    $scope.addLifeInsuranceAccount = function(LifeInsurance){
        if (utils.canProcess()){
            LifeInsurance._Accounts.push(
                {
                    TSLifeInsuranceAccountID: newID--,
                    TSLifeInsuranceID: LifeInsurance.TSLifeInsuranceID
                }
            );
        }
    };
    $scope.deleteLifeInsuranceAccount = function(LifeInsurance, LifeInsuranceAccount){
        if (utils.canProcess()){
            var TSLifeInsuranceAccountID = LifeInsuranceAccount.TSLifeInsuranceAccountID;
            if (TSLifeInsuranceAccountID > 0){
                var confirmDelete = confirm('Are you sure you want to delete the Life Insurance account? Any unsaved changes will be lost.');
                if (confirmDelete){
                    var postData = {
                        TSLifeInsuranceAccountID: TSLifeInsuranceAccountID 
                    };
                    BLAPI.post('TrustSettlements/LifeInsuranceAccount?FilterType=Delete', postData, function(data){
                        $rootScope.setMessage('Life Insurance account deleted');
                        self.getData();
                    });
                }
            }else {
                LifeInsurance._Accounts = _.pull(LifeInsurance._Accounts, LifeInsuranceAccount);
            }
        }
    };

    //IRA stuff
    $scope.IRA = [];
    $scope.showIRAAccounts = false;
    $scope.IRAAccountGridOptions = [];
    var IRAAccountBooleanFields = ['IsClients'];
    
    $scope.IRAGridOptions = { 
        data: 'IRA',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [
            { 
                field: '', 
                displayName: '', 
                enableCellEdit: false,
                sortable: false,
                groupable: false,
                width: 24,
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><i ng-click="deleteIRA(row.entity)" title="Delete Dec. IRA" class="link glyphicon glyphicon-remove"></i></div>' 
            },
            { field: 'ShortName', displayName: 'Short Name', width: 250 },
            { field: 'CompanyName', displayName: 'Company', width: 200 },
            { field: 'StreetAddress', displayName: 'Address', width: 170 },
            { field: 'City', displayName: 'City', width: 150 },
            { field: 'State', displayName: 'State', width: 50 },
            { field: 'Zip', displayName: 'Zip', width: 100 },
            { field: 'Country', displayName: 'Country (if not USA)', width: 150 },
            { field: 'ContactName', displayName: 'Contact Name', width: 150 },
            { field: 'Phone', displayName: 'Phone', width: 170 },
            { field: 'Fax', displayName: 'Fax', width: 120 },
            { field: 'Email', displayName: 'Email', width: 200 },
            { field: 'Notes', displayName: 'Notes', width: 544 }
        ],
        plugins: [new ngGridFlexibleHeightPlugin()]
    };
    
    
    $scope.addIRA = function(){
        if (utils.canProcess()){
            var data = {InstitutionTypeID:5};
            self.openModal(
                'IRAs', 
                'modules/TrustSettlements/Modals/AddBankModal.html', 
                AddBankModalController, 
                data, 
                function(data){ 
                    var SelectedItems = data.SelectedItems;
                    for (var i = 0; i < SelectedItems.length; i++) {
                        var item = SelectedItems[i];
                        item.TSIRAID = newID--;
                        item.TrustSettlementID = $scope.TrustSettlementID;
                        $scope.IRA.push(item);
                    }
                    self.saveSettlement();
                }
            );
        }
    };
    
//    $scope.addIRA = function(){
//        if (utils.canProcess()) {
//            $scope.IRA.push(
//                {
//                    TSIRAID: newID--,
//                    TrustSettlementID: $scope.TrustSettlementID
//                }
//            );
//        }
//    };
    $scope.deleteIRA = function(IRA){
        if (utils.canProcess()) {
            var TSIRAID = IRA.TSIRAID;
            if (TSIRAID > 0){
                var confirmDelete = confirm('Are you sure you want to delete the IRA? Any unsaved changes will be lost.');
                if (confirmDelete){
                    
                    var postData = IRA;
                    BLAPI.post('TrustSettlements/IRA?FilterType=Delete', postData, function (data) {
                        $rootScope.setMessage('IRA deleted');
                        self.getData();
                    });
                }
            }else {
                $scope.IRA = _.pull($scope.IRA, IRA);
            }
        }
    };
    $scope.getIRAAccountGridOptions = function(){
        return {
            data: 'b._Accounts',
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEditOnFocus: true,
            columnDefs: [
                { 
                    field: '', 
                    displayName: '', 
                    enableCellEdit: false,
                    sortable: false,
                    groupable: false,
                    width: 24,
                    cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><i ng-click="deleteIRAAccount(b, row.entity)" title="Delete IRA Account" class="link glyphicon glyphicon-remove"></i></div>' 
                },
                { 
                    field: 'IsDone', 
                    displayName: '', 
                    width: 30,
                    enableCellEdit: false,
                    cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><input type="checkbox" style="margin: 5px;" ng-model="COL_FIELD" /></div>'
                },
                { 
                    field: 'IsClients', 
                    displayName: 'Clients', 
                    width: 60,
                    enableCellEdit: false,
                    cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><input type="checkbox" style="margin: 5px;" ng-model="COL_FIELD" /></div>'
                },
                { field: 'AccountNumber', displayName: 'Account Number', width: 190 },
                { field: 'EstimatedValue', displayName: 'Estm. Value', width: 120, cellFilter: 'currency', cellClass: 'right' },
                { 
                    field: 'OwnerTypeID', 
                    displayName: 'Type', 
                    width: 78,
                    enableCellEdit: false,
                    cellTemplate: '<div ng-class="col.colIndex()"><select ng-model="COL_FIELD" ng-options="i.OwnerTypeID as i.Name for i in OwnerTypes"><option value=""></option></select></div>'
                },
			    { field: 'DODOwner', displayName: 'DOD Owner', width: 180 },
                { field: 'DODValue', displayName: 'DOD Value', width: 120, cellFilter: 'currency', cellClass: 'right' },
                { field: 'AccountType', displayName: 'Account Type', width: 150 },
                { field: 'ShortName', displayName: 'Short Name', width: 250 },
                { field: 'Participant', displayName: 'Participant', width: 170 },
                { field: 'PrimaryBeneficiary', displayName: 'Primary Beneficiary', width: 170 },
                { field: 'ContigentBeneficiary', displayName: 'Contigent Beneficiary', width: 170 },
                { field: 'ConfirmedBeneficiaryAtRBD', displayName: 'Confirmed Beneficiary at RBD', width: 250 },
                { field: 'Notes', displayName: 'Notes', width: 450 }
            ],
            plugins: [new ngGridFlexibleHeightPlugin()]
        };
    };
    $scope.addIRAAccount = function(IRA){
        if (utils.canProcess()){
            IRA._Accounts.push(
                {
                    TSIRAAccountID: newID--,
                    TSIRAID: IRA.TSIRAID
                }
            );
        }
    };
    $scope.deleteIRAAccount = function(IRA, IRAAccount){
        if (utils.canProcess()){
            var TSIRAAccountID = IRAAccount.TSIRAAccountID;
            if (TSIRAAccountID > 0){
                var confirmDelete = confirm('Are you sure you want to delete the IRA account? Any unsaved changes will be lost.');
                if (confirmDelete){
                    var postData = {
                        FilterType: 'Delete',
                        TSIRAAccountID: TSIRAAccountID 
                    };
                    BLAPI.post('TrustSettlements/IRAAccount?FilterType=Delete', postData, function(data){
                        $rootScope.setMessage('IRA account deleted');
                        self.getData();
                    });
                }
            }else {
                IRA._Accounts = _.pull(IRA._Accounts, IRAAccount);
            }
        }
    };
    
    
    //Annuity stuff
    $scope.Annuity = [];
    $scope.showAnnuityAccounts = false;
    $scope.AnnuityAccountGridOptions = [];
    var AnnuityAccountDateFields = ['PremiumDate'];
    var AnnuityAccountBooleanFields = ['IsClients','IsQualified'];
    
    $scope.AnnuityGridOptions = { 
        data: 'Annuity',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [
            { 
                field: '', 
                displayName: '', 
                enableCellEdit: false,
                sortable: false,
                groupable: false,
                width: 24,
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><i ng-click="deleteAnnuity(row.entity)" title="Delete Dec. Annuity" class="link glyphicon glyphicon-remove"></i></div>' 
            },
            { field: 'ShortName', displayName: 'Short Name', width: 250 },
            { field: 'CompanyName', displayName: 'Company', width: 200 },
            { field: 'StreetAddress', displayName: 'Address', width: 170 },
            { field: 'City', displayName: 'City', width: 150 },
            { field: 'State', displayName: 'State', width: 50 },
            { field: 'Zip', displayName: 'Zip', width: 100 },
            { field: 'Country', displayName: 'Country (if not USA)', width: 150 },
            { field: 'ContactName', displayName: 'Contact Name', width: 150 },
            { field: 'Phone', displayName: 'Phone', width: 170 },
            { field: 'Fax', displayName: 'Fax', width: 120 },
            { field: 'Email', displayName: 'Email', width: 200 },
            { field: 'Notes', displayName: 'Notes', width: 544 }
        ],
        plugins: [new ngGridFlexibleHeightPlugin()]
    };
    
    $scope.addAnnuity = function () {
        if (utils.canProcess()){
            var data = {InstitutionTypeID:6};
            self.openModal(
                'Annuities', 
                'modules/TrustSettlements/Modals/AddBankModal.html', 
                AddBankModalController, 
                data, 
                function(data){ 
                    var SelectedItems = data.SelectedItems;
                    for (var i = 0; i < SelectedItems.length; i++) {
                        var item = SelectedItems[i];
                        item.TSAnnuityID = newID--;
                        item.TrustSettlementID = $scope.TrustSettlementID;
                        $scope.Annuity.push(item);
                    }
                    self.saveSettlement();
                }
            );
        }
    };
    
//    $scope.addAnnuity = function(){
//        if (utils.canProcess()) {
//            $scope.Annuity.push(
//                {
//                    TSAnnuityID: newID--,
//                    TrustSettlementID: $scope.TrustSettlementID
//                }
//            );
//        }
//    };
    $scope.deleteAnnuity = function(Annuity){
        if (utils.canProcess()) {
            var TSAnnuityID = Annuity.TSAnnuityID;
            if (TSAnnuityID > 0){
                var confirmDelete = confirm('Are you sure you want to delete the Annuity? Any unsaved changes will be lost.');
                if (confirmDelete){
                    
                    var postData = Annuity;
                    BLAPI.post('TrustSettlements/Annuity?FilterType=Delete', postData, function (data) {
                        $rootScope.setMessage('Annuity deleted');
                        self.getData();
                    });
                }
            }else {
                $scope.Annuity = _.pull($scope.Annuity, Annuity);
            }
        }
    };
    $scope.getAnnuityAccountGridOptions = function(){
        return {
            data: 'b._Accounts',
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEditOnFocus: true,
            columnDefs: [
                { 
                    field: '', 
                    displayName: '', 
                    enableCellEdit: false,
                    sortable: false,
                    groupable: false,
                    width: 24,
                    cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><i ng-click="deleteAnnuityAccount(b, row.entity)" title="Delete Annuity Account" class="link glyphicon glyphicon-remove"></i></div>' 
                },
                { 
                    field: 'IsDone', 
                    displayName: '', 
                    width: 30,
                    enableCellEdit: false,
                    cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><input type="checkbox" style="margin: 5px;" ng-model="COL_FIELD" /></div>'
                },
                { 
                    field: 'IsClients', 
                    displayName: 'Clients', 
                    width: 60,
                    enableCellEdit: false,
                    cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><input type="checkbox" style="margin: 5px;" ng-model="COL_FIELD" /></div>'
                },
                { field: 'AccountNumber', displayName: 'Contract Number', width: 190 },
                { field: 'EstimatedValue', displayName: 'Estm. Value', width: 120, cellFilter: 'currency', cellClass: 'right' },
                { 
                    field: 'OwnerTypeID', 
                    displayName: 'Type', 
                    width: 78,
                    enableCellEdit: false,
                    cellTemplate: '<div ng-class="col.colIndex()"><select ng-model="COL_FIELD" ng-options="i.OwnerTypeID as i.Name for i in OwnerTypes"><option value=""></option></select></div>'
                },
			    { field: 'DODOwner', displayName: 'DOD Owner', width: 180 },
                { field: 'DODValue', displayName: 'DOD Value', width: 120, cellFilter: 'currency', cellClass: 'right'},
                { field: 'AccountType', displayName: 'Annuity Type', width: 150 },
                { field: 'ShortName', displayName: 'Short Name', width: 250 },
                { field: 'Annuitant', displayName: 'Annuitant', width: 120 },
                { field: 'PrimaryBeneficiary', displayName: 'Primary Beneficiary', width: 180 },
                { field: 'ContigentBeneficiary', displayName: 'Contigent Beneficiary', width: 180 },
                { 
                    field: 'IsQualified', 
                    displayName: 'Qualified?', 
                    width: 100,
                    enableCellEdit: false,
                    cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><input type="checkbox" style="margin: 5px;" ng-model="COL_FIELD" /></div>'
                },
                { 
                    field: '_PremiumDate', 
                    displayName: 'Premium Date', 
                    width: 120,
                    enableCellEdit: false,
                    cellTemplate: '<div ng-class="col.colIndex()"><input type="text" ui-date="uiDateOptions" class="ngCellDateInput" ng-model="COL_FIELD" /></div>'
                },
                { field: 'PremiumAmount', displayName: 'Premium Amt', width: 120, cellFilter: 'currency', cellClass: 'right'},
                //Don't need because same as DODValue
                //{ field: 'CurrentValue', displayName: 'Current Value', width: 120, cellFilter: 'currency', cellClass: 'right'},
                { field: 'TaxablePortion', displayName: 'Taxable Portion', width: 120, cellFilter: 'currency', cellClass: 'right'},
                { field: 'RedemptionValue', displayName: 'Redemption Value', width: 140, cellFilter: 'currency', cellClass: 'right'},
                { field: 'IncomeAmountRecognizedOnRedemption', displayName: 'Income Amt Rec. On Redemption', width: 250, cellFilter: 'currency', cellClass: 'right'},
                { field: 'OptionsForDistibution', displayName: 'Options For Distibution', width: 250 },
                { field: 'Notes', displayName: 'Notes', width: 450 }
                
            ],
            plugins: [new ngGridFlexibleHeightPlugin()]
        };
    };
    $scope.addAnnuityAccount = function(Annuity){
        if (utils.canProcess()){
            Annuity._Accounts.push(
                {
                    TSAnnuityAccountID: newID--,
                    TSAnnuityID: Annuity.TSAnnuityID
                }
            );
        }
    };
    $scope.deleteAnnuityAccount = function(Annuity, AnnuityAccount){
        if (utils.canProcess()){
            var TSAnnuityAccountID = AnnuityAccount.TSAnnuityAccountID;
            if (TSAnnuityAccountID > 0){
                var confirmDelete = confirm('Are you sure you want to delete the Annuity account? Any unsaved changes will be lost.');
                if (confirmDelete){
                    var postData = {
                        FilterType: 'Delete',
                        TSAnnuityAccountID: TSAnnuityAccountID 
                    };
                    BLAPI.post('TrustSettlements/AnnuityAccount?FilterType=Delete', postData, function(data){
                        $rootScope.setMessage('Annuity account deleted');
                        self.getData();
                    });
                }
            }else {
                Annuity._Accounts = _.pull(Annuity._Accounts, AnnuityAccount);
            }
        }
    };
    
    
   
    
    //Getting Initial data
    self.init = function () {
        self.addWatches();
        self.getData();
    };
    
    //Scope and Watches
    self.addWatches = function(){
    };
    
    self.getData = function () {
        //Get All data in one shot
        
        var trustSettlementID = $scope.TrustSettlementID;
        if (trustSettlementID == null){
            trustSettlementID = -1;
        }
        
        BLAPI.get('TrustSettlements/EditAssets?TrustSettlementID=' + trustSettlementID, function (data) {
            //Do any conversions
            var Settlement = data.Settlement;
            var Settlements = data.Settlements;
//            var TrustSettlementID = $scope.TrustSettlementID;
//            if (TrustSettlementID != null) {
//                var Settlement = _.find(Settlements, function (item) {
//                    //Do only == since the TrustSettlementID routeParam is a string (e.g. '1')
//                    return item.TrustSettlementID == TrustSettlementID;
//                });
//            }
            $scope.Settlements = Settlements;
            if (Settlement != null){
                $scope.Settlement = Settlement;
                $scope.hasSettlement = true;
//                data.Settlement = Settlement;
            }else{
                $scope.hasSettlement = false;
            }
            
            //Vehicles
            $scope.Vehicles = data.Vehicles;
            
            //Properties
            var Properties = data.Properties;
            utils.createShadowDateProperties(Properties, PropertiesDateFields);
            utils.setBooleanProperties(Properties, PropertiesBooleanFields);
            $scope.Properties = Properties;
            
            //Mortgages
            $scope.Mortgages = data.Mortgages;
            
            //Banks
            var Banks = data.Banks;
            $scope.bankAccountGridOptions = [];
            if (Banks.length > 0){
                $scope.showBankAccounts = true;
                for (var i = 0; i < Banks.length; i++) {
                    var item = Banks[i];
                    item._showAccounts = true;
                    
                    //Fill out the options for each of the account grids with a newly instantiated object so the plugins are independent.
//                    $scope['bankAccountGridOptions' + i] = $scope.getBankAccountGridOptions();
                    
                    
                    $scope.bankAccountGridOptions[i] = $scope.getBankAccountGridOptions();
                }
            }else{
                $scope.showBankAccounts = false;
            }
            $scope.Banks = Banks;
            
            //Brokers
            var Brokers = data.Brokers;
            $scope.brokerAccountGridOptions = [];
            if (Brokers.length > 0){
                $scope.showBrokerAccounts = true;
                for (var i = 0; i < Brokers.length; i++) {
                    var item = Brokers[i];
                    item._showAccounts = true;
                    
                    //Really just a work around to get a different instance of the FlexibleHeightPlugin for each grid in the loop
                    $scope.brokerAccountGridOptions[i] = $scope.getBrokerAccountGridOptions();
                }
            }else{
                $scope.showBrokerAccounts = false;
            }
            $scope.Brokers = Brokers;
            
            //Stocks
            var Stocks = data.Stocks;
            if (Stocks.length > 0){
                $scope.showStockAccounts = true;
                for (var i = 0; i < Stocks.length; i++) {
                    var item = Stocks[i];
                    item._showAccounts = true;
                }
            }else{
                $scope.showStockAccounts = false;
            }
            $scope.Stocks = Stocks;
            //Fill the options for the stock account grids
            self.fillStockAccountGridOptions();
            
            //USBonds
            $scope.USBonds = data.USBonds;
            
            //LifeInsurance
            var LifeInsurance = data.LifeInsurance;
            $scope.LifeInsuranceAccountGridOptions = [];
            if (LifeInsurance.length > 0){
                $scope.showLifeInsuranceAccounts = true;
                for (var i = 0; i < LifeInsurance.length; i++) {
                    var item = LifeInsurance[i];
                    item._showAccounts = true;
                    
                    if ($scope.LifeInsuranceAccountGridOptions.length <= i){
                        //Really just a work around to get a different instance of the FlexibleHeightPlugin for each grid in the loop
                        $scope.LifeInsuranceAccountGridOptions[i] = $scope.getLifeInsuranceAccountGridOptions();
                    }
                    
                    var accounts = item._Accounts;
                    utils.setBooleanProperties(accounts, LifeInsuranceAccountBooleanFields);
                }
            }else{
                $scope.showLifeInsuranceAccounts = false;
            }
            $scope.LifeInsurance = LifeInsurance;
            
            //IRA
            var IRA = data.IRA;
//            $scope.IRAAccountGridOptions = [];
            if (IRA.length > 0){
                $scope.showIRAAccounts = true;
                for (var i = 0; i < IRA.length; i++) {
                    var item = IRA[i];
                    item._showAccounts = true;
                    
                    if ($scope.IRAAccountGridOptions.length <= i){
                        //Really just a work around to get a different instance of the FlexibleHeightPlugin for each grid in the loop
                        $scope.IRAAccountGridOptions[i] = $scope.getIRAAccountGridOptions();
                    }
                    
                    var accounts = item._Accounts;
                    utils.setBooleanProperties(accounts, IRAAccountBooleanFields);
                }
            }else{
                $scope.showIRAAccounts = false;
            }
            $scope.IRA = IRA;
            
            
            //Annuity
            var Annuity = data.Annuity;
            $scope.AnnuityAccountGridOptions = [];
            if (Annuity.length > 0){
                $scope.showAnnuityAccounts = true;
                for (var i = 0; i < Annuity.length; i++) {
                    var item = Annuity[i];
                    item._showAccounts = true;
                    
                    
                    if ($scope.AnnuityAccountGridOptions.length <= i){
                        //Really just a work around to get a different instance of the FlexibleHeightPlugin for each grid in the loop
                        $scope.AnnuityAccountGridOptions[i] = $scope.getAnnuityAccountGridOptions();
                    }
                    
                    var accounts = item._Accounts;
                    utils.createShadowDateProperties(accounts, AnnuityAccountDateFields);
                    utils.setBooleanProperties(accounts, AnnuityAccountBooleanFields);
                }
            }else{
                $scope.showAnnuityAccounts = false;
            }
            $scope.Annuity = Annuity;
            
            //MiscAsset
            $scope.MiscAsset = data.MiscAsset;
            
            
            //Assets
            var Assets = utils.getAssets(data);
            var assetsInfo = utils.processAssets(Assets, $scope.Settlement);
            $scope.assetsInfo = assetsInfo;
            
//            $scope.totalEstate = assetsInfo.totalEstate;
//            $scope.trustATotal = assetsInfo.trustATotal;
//            $scope.trustBTotal = assetsInfo.trustBTotal;
//            $scope.estimatedValue = assetsInfo.estimatedValue;
//            $scope.estimatedTrustATotal = assetsInfo.estimatedTrustATotal;
//            $scope.estimatedTrustBTotal = assetsInfo.estimatedTrustBTotal;
            
            
            //Data
            $scope.data = data;
            
            $scope.settlementEmptyOption = 'Please Select a Settlement';
        });
        
    };       
    
    self.fillStockAccountGridOptions = function(){
        var Stocks = $scope.Stocks;
        $scope.stockAccountGridOptions = [];
        for (var i = 0; i < Stocks.length; i++) {
            //Really just a work around to get a different instance of the FlexibleHeightPlugin for each grid in the loop
            $scope.stockAccountGridOptions[i] = $scope.getStockAccountGridOptions();
        }
    };
    
    //Other Handlers
    $scope.saveSettlementClick = function () { 
        if (utils.canProcess()){
            self.saveSettlement();
        }
    };
    
    
    
    self.saveSettlement = function () { 
        var isValid = true;
        if (isValid) {
            var data = $scope.data;
            
            utils.mergeShadowDateProperties(data.Properties, PropertiesDateFields);
            
            for (var i = 0; i < data.Annuity.length; i++) {
                var item = data.Annuity[i];
                var accounts = item._Accounts;
                if (accounts != null){
                    utils.mergeShadowDateProperties(accounts, AnnuityAccountDateFields);
                }
            }
            
            BLAPI.post('TrustSettlements/EditAssets', data, function (data) {
                $rootScope.setMessage('Saved');
                self.getData();
            });
        }else{
            $rootScope.setMessage('Cannot save. Missing fields!', 'warning');
        }
    };
    
    
    //Vehicle stuff
    $scope.addVehicle = function(){
        if (utils.canProcess()) {
            $scope.Vehicles.push(
                {
                    TSVehicleID: newID--,
                    TrustSettlementID: $scope.TrustSettlementID
                }
            );
        }
    };
    $scope.deleteVehicle = function(vehicle){
        if (utils.canProcess()) {
            var TSVehicleID = vehicle.TSVehicleID;
            if (TSVehicleID > 0){
                var confirmDelete = confirm('Are you sure you want to delete the vehicle? Any unsaved changes will be lost.');
                if (confirmDelete){
                    var postData = {
                        FilterType: 'Delete',
                        TSVehicleID: TSVehicleID 
                    };
                    BLAPI.post('TrustSettlements/Vehicle', postData, function(data){
                        $rootScope.setMessage('Vehicle deleted');
                        self.getData();
                    });
                }
            }else {
                $scope.Vehicles = _.pull($scope.Vehicles, vehicle);
            }
        }
    };
    
    //Property Stuff
    $scope.addProperty = function(){
        if (utils.canProcess()) {
            $scope.Properties.push(
                {
                    TSPropertyID: newID--,
                    TrustSettlementID: $scope.TrustSettlementID,
                    IsOutsideTrust: false
                }
            );
        }
    };
    $scope.deleteProperty = function(property){
        if (utils.canProcess()) {
            var TSPropertyID = property.TSPropertyID;
            //console.log(TSClientID);
            if (TSPropertyID > 0){
                var confirmDelete = confirm('Are you sure you want to delete the property? Any unsaved changes will be lost.');
                if (confirmDelete){
                    var postData = {
                        FilterType: 'Delete',
                        TSPropertyID: TSPropertyID 
                    };
                    BLAPI.post('TrustSettlements/Property', postData, function(data){
                        $rootScope.setMessage('Property deleted')
                        self.getData();
                    });
                }
            }else {
                $scope.Properties = _.pull($scope.Properties, property);
            }
        }
    };
    $scope.editPropertyDescriptionClick = function (property) {
        if (utils.canProcess()) {
            //            console.log(property);
            self.openEditTextModal('Edit Legal Description', property, 'LegalDescription', function(){
                self.saveSettlement();
            });
        }
    };
    self.openEditTextModal = function (title, object, textPropertyName, cb) {
        var modalInstance = $modal.open({
            templateUrl: 'modules/TrustSettlements/Modals/EditTextModal.html',
            controller: EditTextModalCtrl,
            size: 'lg',
            resolve: {
                title: function () {
                    return title;
                },
                object: function () {
                    return object;
                },
                textPropertyName: function () {
                    return textPropertyName;
                }
            }
        });
        modalInstance.result.then(
            //Success function (i.e. 'Save' button)
            function () {
                if (cb != null && _.isFunction(cb)){
                    cb();
                }
            }, 
            //Cancel function
            function () {
                //Do nothing
            }
        );
    };
    var EditTextModalCtrl = function ($scope, $modalInstance, title, object, textPropertyName) {
        $scope.title = title;
        $scope.object = object;
        $scope.myObject = {
            myText: object[textPropertyName]
        };

        $scope.save = function () {
            var text = $scope.myObject.myText;
            object[textPropertyName] = text;
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };
    
    
    
    
    //Mortgage stuff
    $scope.addMortgage = function(){
        if (utils.canProcess()) {
            $scope.Mortgages.push(
                {
                    TSMortgageID: newID--,
                    TrustSettlementID: $scope.TrustSettlementID
                }
            );
        }
    };
    $scope.deleteMortgage = function(mortgage){
        if (utils.canProcess()) {
            var TSMortgageID = mortgage.TSMortgageID;
            if (TSMortgageID > 0){
                var confirmDelete = confirm('Are you sure you want to delete the mortgage? Any unsaved changes will be lost.');
                if (confirmDelete){
                    var postData = {
                        FilterType: 'Delete',
                        TSMortgageID: TSMortgageID 
                    };
                    BLAPI.post('TrustSettlements/Mortgage', postData, function(data){
                        $rootScope.setMessage('Mortgage deleted');
                        self.getData();
                    });
                }
            }else {
                $scope.Mortgages = _.pull($scope.Mortgages, mortgage);
            }
        }
    };
    
    
    
    
    //Bank Account stuff
    $scope.addBankAccount = function(bank){
        if (utils.canProcess()){
            bank._Accounts.push(
                {
                    TSBankAccountID: newID--,
                    TSBankID: bank.TSBankID
                }
            );
        }
    };
    $scope.deleteBankAccount = function(bank, bankAccount){
        if (utils.canProcess()){
            var TSBankAccountID = bankAccount.TSBankAccountID;
            if (TSBankAccountID > 0){
                var confirmDelete = confirm('Are you sure you want to delete the bank account? Any unsaved changes will be lost.');
                if (confirmDelete){
                    var postData = {
                        FilterType: 'Delete',
                        TSBankAccountID: TSBankAccountID 
                    };
                    BLAPI.post('TrustSettlements/BankAccount', postData, function(data){
                        $rootScope.setMessage('Bank account deleted');
                        self.getData();
                    });
                }
            }else {
                bank._Accounts = _.pull(bank._Accounts, bankAccount);
            }
        }
    };
    
    
    //Broker Stuff
    $scope.addBroker = function(){
        if (utils.canProcess()){
            var data = {InstitutionTypeID:2};
            self.openModal(
                'Brokers', 
                'modules/TrustSettlements/Modals/AddBankModal.html', 
                AddBankModalController, 
                data, 
                function(data){ 
                    var SelectedItems = data.SelectedItems;
                    for (var i = 0; i < SelectedItems.length; i++) {
                        var item = SelectedItems[i];
                        item.TSBrokerID = newID--;
                        item.TrustSettlementID = $scope.TrustSettlementID;
                        $scope.Brokers.push(item);
                    }
                    self.saveSettlement();
                }
            );
        }
    };
//    $scope.addBroker = function(){
//        if (utils.canProcess()){
//            $scope.Brokers.push(
//                {
//                    TSBrokerID: newID--,
//                    TrustSettlementID: $scope.TrustSettlementID
//                }
//            );
//        }
//    };
    $scope.deleteBroker = function(broker){
        if (utils.canProcess()) {
            var TSBrokerID = broker.TSBrokerID;
            if (TSBrokerID > 0){
                var confirmDelete = confirm('Are you sure you want to delete the broker? Any unsaved changes will be lost.');
                if (confirmDelete){
                    var postData = {
                        FilterType: 'Delete',
                        TSBrokerID: TSBrokerID 
                    };
                    BLAPI.post('TrustSettlements/Broker', postData, function(data){
                        $rootScope.setMessage('Broker deleted');
                        self.getData();
                    });
                }
            }else {
                $scope.Brokers = _.pull($scope.Brokers, broker);
            }
        }
    };
    
    //Broker Account stuff
    $scope.addBrokerAccount = function(broker){
        if (utils.canProcess()){
            broker._Accounts.push(
                {
                    TSBrokerAccountID: newID--,
                    TSBrokerID: broker.TSBrokerID
                }
            );
        }
    };
    $scope.deleteBrokerAccount = function(broker, brokerAccount){
        if (utils.canProcess()){
            var TSBrokerAccountID = brokerAccount.TSBrokerAccountID;
            if (TSBrokerAccountID > 0){
                var confirmDelete = confirm('Are you sure you want to delete the broker account? Any unsaved changes will be lost.');
                if (confirmDelete){
                    var postData = {
                        FilterType: 'Delete',
                        TSBrokerAccountID: TSBrokerAccountID 
                    };
                    BLAPI.post('TrustSettlements/BrokerAccount', postData, function(data){
                        $rootScope.setMessage('Broker account deleted');
                        self.getData();
                    });
                }
            }else {
                broker._Accounts = _.pull(broker._Accounts, brokerAccount);
            }
        }
    };
    
    //Stock Stuff
    
    $scope.addStock = function(){
        if (utils.canProcess()){
            var data = {InstitutionTypeID:3};
            self.openModal(
                'Transfer Agents', 
                'modules/TrustSettlements/Modals/AddBankModal.html', 
                AddBankModalController, 
                data, 
                function(data){ 
                    var SelectedItems = data.SelectedItems;
                    for (var i = 0; i < SelectedItems.length; i++) {
                        var item = SelectedItems[i];
                        item.TSStockID = newID--;
                        item.TrustSettlementID = $scope.TrustSettlementID;
                        $scope.Stocks.push(item);
                    }
                    self.saveSettlement();
                }
            );
        }
    };
    
//    $scope.addStock = function(){
//        if (utils.canProcess()){
//            $scope.Stocks.push(
//                {
//                    TSStockID: newID--,
//                    TrustSettlementID: $scope.TrustSettlementID
//                }
//            );
//            self.fillStockAccountGridOptions();
//        }
//    };
    $scope.deleteStock = function(stock){
        if (utils.canProcess()) {
            var TSStockID = stock.TSStockID;
            if (TSStockID > 0){
                var confirmDelete = confirm('Are you sure you want to delete the stock? Any unsaved changes will be lost.');
                if (confirmDelete){
                    var postData = stock;
                    BLAPI.post('TrustSettlements/Stocks?FilterType=Delete', postData, function (data) {
                        $rootScope.setMessage('Stock deleted');
                        self.getData();
                    });
                }
            }else {
                $scope.Stocks = _.pull($scope.Stocks, stock);
            }
            self.fillStockAccountGridOptions();
        }
    };
    
    //Stock Account stuff
    $scope.addStockAccount = function(stock){
        if (utils.canProcess()){
            stock._Accounts.push(
                {
                    TSStockAccountID: newID--,
                    TSStockID: stock.TSStockID
                }
            );
        }
    };
    $scope.deleteStockAccount = function(stock, stockAccount){
        if (utils.canProcess()){
            var TSStockAccountID = stockAccount.TSStockAccountID;
            if (TSStockAccountID > 0){
                var confirmDelete = confirm('Are you sure you want to delete the stock account? Any unsaved changes will be lost.');
                if (confirmDelete){
                    var postData = stockAccount;
                    BLAPI.post('TrustSettlements/StockAccounts?FilterType=Delete', postData, function (data) {
                        $rootScope.setMessage('Stock deleted');
                        self.getData();
                    });
                }
            }else {
                stock._Accounts = _.pull(stock._Accounts, stockAccount);
            }
        }
    };
    
    //USBonds stuff
    $scope.USBondsGridOptions = { 
        data: 'USBonds',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [
            { 
                field: '', 
                displayName: '', 
                enableCellEdit: false,
                sortable: false,
                groupable: false,
                width: 24,
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><i ng-click="deleteUSBond(row.entity)" title="Delete US Savings Bond" class="link glyphicon glyphicon-remove"></i></div>' 
            },
            { 
                field: 'IsDone', 
                displayName: '', 
                width: 30,
                enableCellEdit: false,
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><input type="checkbox" style="margin: 5px;" ng-model="COL_FIELD" /></div>'
            },
            { field: 'SerialNumber', displayName: 'Serial Number', width: 120 },
            { field: 'EstimatedValue', displayName: 'Estm. Value', width: 120, cellFilter: 'currency', cellClass: 'right' },
            { 
                field: 'OwnerTypeID', 
                displayName: 'Type', 
                width: 78,
                enableCellEdit: false,
                cellTemplate: '<div ng-class="col.colIndex()"><select ng-model="COL_FIELD" ng-options="i.OwnerTypeID as i.Name for i in OwnerTypes"><option value=""></option></select></div>'
            },
            { field: 'DODOwner', displayName: 'DOD Owner', width: 180 },
            { field: 'DODValue', displayName: 'DOD Value', width: 120, cellFilter: 'currency', cellClass: 'right' },
            { field: 'FaceAmount', displayName: 'Face Amount', width: 120, cellFilter: 'currency', cellClass: 'right' },
            { field: 'BondDescription', displayName: 'Desc. (eg Series I)', width: 140 },
//            { field: 'Cusip', displayName: 'Cusip', width: 100 },
            { field: 'IssueDate', displayName: 'Issue (MM/YYYY)', width: 125 },
            { field: 'ShortName', displayName: 'Short Name', width: 250 },
            { field: 'Notes', displayName: 'Notes', width: 500 }
        ],
        plugins: [new ngGridFlexibleHeightPlugin()]
    };
    $scope.addUSBond = function(){
        if (utils.canProcess()) {
            $scope.USBonds.push(
                {
                    TSUSBondID: newID--,
                    TrustSettlementID: $scope.TrustSettlementID
                }
            );
        }
    };
    $scope.deleteUSBond = function(USBond){
        if (utils.canProcess()) {
            var TSUSBondID = USBond.TSUSBondID;
            if (TSUSBondID > 0){
                var confirmDelete = confirm('Are you sure you want to delete the US Savings Bond? Any unsaved changes will be lost.');
                if (confirmDelete){
                    
                    var postData = USBond;
                    BLAPI.post('TrustSettlements/USBond?FilterType=Delete', postData, function (data) {
                        $rootScope.setMessage('US Savings Bond deleted');
                        self.getData();
                    });
                }
            }else {
                $scope.USBonds = _.pull($scope.USBonds, USBond);
            }
        }
    };
    
    
    //MiscAsset stuff
    $scope.MiscAssetGridOptions = { 
        data: 'MiscAsset',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [
            { 
                field: '', 
                displayName: '', 
                enableCellEdit: false,
                sortable: false,
                groupable: false,
                width: 24,
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><i ng-click="deleteMiscAsset(row.entity)" title="Delete" class="link glyphicon glyphicon-remove"></i></div>' 
            },
            { 
                field: 'IsDone', 
                displayName: '', 
                width: 30,
                enableCellEdit: false,
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><input type="checkbox" style="margin: 5px;" ng-model="COL_FIELD" /></div>'
            },
            { field: 'ShortName', displayName: 'Short Name', width: 250 },
            { field: 'EstimatedValue', displayName: 'Estm. Value', width: 120, cellFilter: 'currency', cellClass: 'right' },
            { 
                field: 'OwnerTypeID', 
                displayName: 'Type', 
                width: 78,
                enableCellEdit: false,
                cellTemplate: '<div ng-class="col.colIndex()"><select ng-model="COL_FIELD" ng-options="i.OwnerTypeID as i.Name for i in OwnerTypes"><option value=""></option></select></div>'
            },
            { field: 'DODOwner', displayName: 'DOD Owner', width: 180 },
            { field: 'DODValue', displayName: 'DOD Value', width: 120, cellFilter: 'currency', cellClass: 'right' },
            { field: 'AccountNumber', displayName: 'Account Number', width: 140 },
            { field: 'CompanyName', displayName: 'Entity Name', width: 200 },
            { field: 'StreetAddress', displayName: 'Address', width: 170 },
            { field: 'City', displayName: 'City', width: 150 },
            { field: 'State', displayName: 'State', width: 50 },
            { field: 'Zip', displayName: 'Zip', width: 100 },
            { field: 'Country', displayName: 'Country (if not USA)', width: 150 },
            { field: 'ContactName', displayName: 'Contact Name', width: 150 },
            { field: 'Phone', displayName: 'Phone', width: 170 },
            { field: 'Fax', displayName: 'Fax', width: 120 },
            { field: 'Email', displayName: 'Email', width: 200 },
            { field: 'Participant', displayName: 'Participant', width: 120 },
            { field: 'PrimaryBeneficiary', displayName: 'Primary Beneficiary', width: 180 },
            { field: 'ContigentBeneficiary', displayName: 'Contigent Beneficiary', width: 180 },
            { field: 'Notes', displayName: 'Notes', width: 450 }
        ],
        plugins: [new ngGridFlexibleHeightPlugin()]
    };
    $scope.addMiscAsset = function(){
        if (utils.canProcess()) {
            $scope.MiscAsset.push(
                {
                    TSMiscAssetID: newID--,
                    TrustSettlementID: $scope.TrustSettlementID
                }
            );
        }
    };
    $scope.deleteMiscAsset = function(MiscAsset){
        if (utils.canProcess()) {
            var TSMiscAssetID = MiscAsset.TSMiscAssetID;
            if (TSMiscAssetID > 0){
                var confirmDelete = confirm('Are you sure you want to delete the row? Any unsaved changes will be lost.');
                if (confirmDelete){
                    var postData = MiscAsset;
                    BLAPI.post('TrustSettlements/MiscAsset?FilterType=Delete', postData, function (data) {
                        $rootScope.setMessage('Misc Asset deleted');
                        self.getData();
                    });
                }
            }else {
                $scope.MiscAsset = _.pull($scope.MiscAsset, MiscAsset);
            }
        }
    };
    
    
    
    //Bank Stuff
    $scope.addBank = function(){
        if (utils.canProcess()){
            var data = {InstitutionTypeID:1};
            self.openModal(
                'Banks', 
                'modules/TrustSettlements/Modals/AddBankModal.html', 
                AddBankModalController, 
                data, 
                function(data){ 
                    var SelectedItems = data.SelectedItems;
                    for (var i = 0; i < SelectedItems.length; i++) {
                        var item = SelectedItems[i];
                        item.TSBankID = newID--;
                        item.TrustSettlementID = $scope.TrustSettlementID;
                        $scope.Banks.push(item);
                    }
                    self.saveSettlement();
                }
            );
        }
    };
    
    $scope.deleteBank = function(bank){
        if (utils.canProcess()) {
            var TSBankID = bank.TSBankID;
            if (TSBankID > 0){
                var confirmDelete = confirm('Are you sure you want to delete the bank? Any unsaved changes will be lost.');
                if (confirmDelete){
                    var postData = {
                        FilterType: 'Delete',
                        TSBankID: TSBankID 
                    };
                    BLAPI.post('TrustSettlements/Bank', postData, function(data){
                        $rootScope.setMessage('Bank deleted');
                        self.getData();
                    });
                }
            }else {
                $scope.Banks = _.pull($scope.Banks, bank);
            }
        }
    };
    
    self.openModal = function (title, templateUrl, controller, data, cb) {
        var modalInstance = $modal.open({
            templateUrl: templateUrl,
            controller: controller,
            size: 'lg',
            resolve: {
                title: function () {
                    return title;
                },
                data: function () {
                    return data;
                }
            }
        });
        modalInstance.result.then(
            //Success function (i.e. 'Save' button)
            function (data) {
                if (cb != null && _.isFunction(cb)){
                    cb(data);
                }
            }, 
            //Cancel function
            function () {
                //Do nothing
            }
        );
    };
    var AddBankModalController = function ($scope, $modalInstance, title, data) {
        var self = this;
        $scope.title = title;
        $scope.data = data;
        
        var newItemID = -1;
        var InstitutionTypeID = data.InstitutionTypeID;
        
        $scope.Items = [];
//        $scope.SelectedItems = [];
        
        $scope.ItemsGridOptions = { 
            data: 'Items',
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEditOnFocus: true,
//            showSelectionCheckbox: true,
            enablePinning: true,
//            selectedItems: $scope.SelectedItems,
            columnDefs: [
                { 
                    field: '_IsSelected', 
                    displayName: '', 
                    width: 30,
                    enableCellEdit: false,
                    pinned: true,
                    cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><input type="checkbox" style="margin: 5px;" ng-model="COL_FIELD" /></div>'
                },
                { 
                    field: '', 
                    displayName: '', 
                    enableCellEdit: false,
                    sortable: false,
                    groupable: false,
                    width: 24,
                    pinned: true,
                    cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><i ng-click="deleteItem(row.entity)" title="Delete Institution" class="link glyphicon glyphicon-remove"></i></div>' 
                },
                { field: 'ShortName', displayName: 'Short Name', width: 150, pinned: true },
                { field: 'CompanyName', displayName: 'Name', width: 200 },
                { field: 'StreetAddress', displayName: 'Address', width: 200 },
                { field: 'City', displayName: 'City', width: 150 },
                { field: 'State', displayName: 'State', width: 50 },
                { field: 'Zip', displayName: 'Zip', width: 100 },
                { field: 'Country', displayName: 'Country (if not USA)', width: 150 },
                { field: 'Phone', displayName: 'Phone', width: 170 },
                { field: 'Fax', displayName: 'Fax', width: 120 },
                { field: 'Email', displayName: 'Email', width: 200 },
                { field: 'Notes', displayName: 'Notes', width: 450 }
            ]
        };
        

        self.init = function(){
            self.getData();
        }
        
        self.getData = function () {
            BLAPI.get('TrustSettlements/Institution?InstitutionTypeID=' + InstitutionTypeID, function (data) {
                $scope.Items = data;
            });
        };
        
        $scope.deleteItem = function(item){
            if (utils.canProcess()) {
                var InstitutionID = item.InstitutionID;
                if (InstitutionID > 0){
                    var confirmDelete = confirm('Are you sure you want to delete the instiution? Any unsaved changes will be lost.');
                    if (confirmDelete){
                        var postData = item;
                        BLAPI.post('TrustSettlements/Institution?FilterType=Delete', postData, function(data){
                            $rootScope.setMessage('Institution deleted');
                            self.getData();
                        });
                    }
                }else {
                    $scope.Items = _.pull($scope.Items, item);
                }
            }
        };
        
        $scope.addItem = function(){
            if (utils.canProcess()) {
                $scope.Items.push({
                    InstitutionID:newItemID--,
                    InstitutionTypeID: InstitutionTypeID
                });
            }
        };
          
        $scope.saveClick = function () {
            self.save();
        };  
        
        self.save = function () {
            var data = $scope.Items;
            BLAPI.post('TrustSettlements/Institution?FilterType=Update', data, function (data) {
                $rootScope.setMessage('Saved');
                self.getData();
            });
        }; 
              
        self.getSelectedItems = function () {
            var SelectedItems = [];
            var items = $scope.Items;
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item._IsSelected === true){
                    SelectedItems.push(item);
                }
            }
            return SelectedItems;
        };
        
        $scope.addClick = function () {
            var SelectedItems = self.getSelectedItems();
            if (SelectedItems.length > 0){
                //Get a reference to the selected items before we save.
                var returnData = {SelectedItems: SelectedItems};
                var data = $scope.Items;
                BLAPI.post('TrustSettlements/Institution?FilterType=Update', data, function (data) {
                    $modalInstance.close(returnData);
                });
            } else {
                $rootScope.setMessage('Please select a bank');
            }
            
//            if ($scope.SelectedItems.length > 0){
//                //Get a reference to the selected items before we save.
//                var returnData = self.getSelectedItems();
//                var data = $scope.Items;
//                BLAPI.post('TrustSettlements/Institution?FilterType=Update', data, function (data) {
//                    $modalInstance.close(returnData);
//                });
//            } else {
//                $rootScope.setMessage('Please select a bank');
//            }
        };

        $scope.cancelClick = function () {
            $modalInstance.dismiss('cancel');
        };
        
        self.init();
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