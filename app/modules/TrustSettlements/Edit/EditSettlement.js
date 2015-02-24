'use strict';

/* Controllers */

var controllers = angular.module('myApp.controllers');

controllers.controller('EditSettlementController', 
    ['$scope', '$location', '$routeParams', 'BLAPI', 'utils', 
function ($scope, $location, $routeParams, BLAPI, utils) {
        
    var self = this;

    //Set Active Links
    utils.setActiveLinks('TS', 'Edit');
    
    //Set new TrustSettlementID
    $scope.TrustSettlementID = utils.setTrustSettlementID($routeParams.TrustSettlementID);
    
    //Variables
    var newClientID = -1;
    var newHeirID = -1;
    var newID = -1;
    
    //Testing
    $scope.myDate = new Date();
    
    //Add variables for binding to the $scope
    $scope.data = {};    
    $scope.Settlements = [];
    $scope.Settlement = {};
    $scope.hasSettlement = false;
    var settlementDateFields = ['DateRetained','DateClosed','Birthdate', 'DateOfDeath','DateOfTrust','DateOfTrustExecution','DateOfTrustRestatement','P15409HearingDate','RetainerReceived','DueDate','FirstDeathDOD'];
    var SettlementBooleanFields = ['IsArchived'];
    $scope.Trustors = {};
    var TrustorsBooleanFields = ['IsMale'];
    $scope.Clients = {};
    var ClientsDateFields = ['Birthdate'];
    var ClientsBooleanFields = ['IsMale','IsPrimary','IsTrustor'];
    $scope.Heirs = {};
    var HeirsDateFields = ['Birthdate'];
    var HeirsBooleanFields = ['IsMale','IsMinor','IsDisinherited','IsCharity','IsSpecificBequest'];
    
    $scope.Preparers = [];
    $scope.Attorneys = [];
    $scope.Notaries = [];
    $scope.Paralegals = [];

    $scope.selectedPreparer = {};
    $scope.selectedAttorney = {};
    $scope.selectedNotary = {};
    $scope.selectedParalegal = {};
    
    $scope.Courthouses = [];
    $scope.SelectedCourthouse = null;
    
    $scope.TrustTypes = [];
    $scope.SelectedTrustType = null;
    
    //ui.date
    $scope.uiDateOptions = {
        changeYear: true,
        changeMonth: true,
        yearRange: '1900:+1'
    }
    
    
    $scope.settlementChanged = function () {
        //            console.log('changed');
        var TrustSettlementID = $scope.Settlement.TrustSettlementID;
        $scope.TrustSettlementID = TrustSettlementID;
        $location.search('TrustSettlementID', TrustSettlementID);
        utils.setTrustSettlementID(TrustSettlementID);
        self.getData();
    };
    
    //Courthouse Stuff
    $scope.courthouseChanged = function () {
        console.log($scope.SelectedCourthouse);
        if($scope.SelectedCourthouse != null && $scope.SelectedCourthouse.CourthouseID != null){
            $scope.Settlement.P15409CourthouseID = $scope.SelectedCourthouse.CourthouseID;
        }else{
            $scope.Settlement.P15409CourthouseID = null;
        }
    };
    
    //Grid
    //    $scope.myData = [{name: "Moroni", age: 50},
    //                     {name: "Tiancum", age: 43},
    //                     {name: "Jacob", age: 27},
    //                     {name: "Nephi", age: 29},
    //                     {name: "Enos", age: 34}];
    //    $scope.gridOptions = { 
    //        data: 'myData',
    //        enableCellSelection: true,
    //        enableRowSelection: false,
    //        enableCellEdit: true,
    //        columnDefs: [
    //            { field: 'name', displayName: 'Name', width: 200 },
    //            { field: 'age', displayName: 'Age', width: 200 }
    //        ]
    //    };

    //          StreetAddress,
    //			City,
    //			State,
    //			Zip,
    //			Phone,
    //			Email,
    //			Gender
    
    $scope.trustorGridOptions = { 
        data: 'Trustors',
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
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><i ng-click="deleteTrustor(row.entity)" title="Delete Trustor" class="link glyphicon glyphicon-remove"></i></div>' 
            },
            { 
                field: 'IsMale', 
                displayName: 'Male?', 
                width: 60,
                enableCellEdit: false,
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><input type="checkbox" style="margin: 5px;" ng-model="COL_FIELD" /></div>'
            },
            { field: 'Name', displayName: 'Name', width: 110 }
        ],
        plugins: [new ngGridFlexibleHeightPlugin()]
    };
    
    $scope.clientGridOptions = { 
        data: 'Clients',
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
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><i ng-click="deleteClient(row.entity)" title="Delete Client" class="link glyphicon glyphicon-remove"></i></div>' 
            },
            { 
                field: 'IsPrimary', 
                displayName: 'Primary', 
                width: 65,
                enableCellEdit: false,
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><input type="checkbox" style="margin: 5px;" ng-model="COL_FIELD" /></div>'
//                editableCellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><input type="checkbox" ng-model="row.entity.IsPrimary" /></div>'
            },
            { 
                field: 'IsMale', 
                displayName: 'Male?', 
                width: 60,
                enableCellEdit: false,
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><input type="checkbox" style="margin: 5px;" ng-model="COL_FIELD" /></div>'
            },
            { 
                field: 'IsTrustor', 
                displayName: 'Trustor', 
                width: 65,
                enableCellEdit: false,
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><input type="checkbox" style="margin: 5px;" ng-model="COL_FIELD" /></div>'
            },
            { field: 'FirstName', displayName: 'First Name', width: 110 },
            { field: 'MiddleName', displayName: 'Middle', width: 70 },
            { field: 'LastName', displayName: 'Last Name', width: 110 },
            { field: 'RelationshipToDecedent', displayName: 'Relationship', width: 200 },
            { field: 'StreetAddress', displayName: 'Address', width: 200 },
            { field: 'City', displayName: 'City', width: 120 },
            { field: 'State', displayName: 'State', width: 50 },
            { field: 'Zip', displayName: 'Zip', width: 100 },
            { field: 'County', displayName: 'County', width: 100 },
            { field: 'Country', displayName: 'Country (if not USA)', width: 150 },
            { field: 'SSN', displayName: 'SSN', width: 100 },
            { field: 'Phone', displayName: 'Phone', width: 140 },
            { field: 'Phone2', displayName: 'Phone 2', width: 140 },
            { field: 'Email', displayName: 'Email', width: 200 },
            { 
                field: '_Birthdate', 
                displayName: 'Birthdate', 
                width: 100,
                enableCellEdit: false,
                cellTemplate: '<div ng-class="col.colIndex()"><input type="text" ui-date="uiDateOptions" class="ngCellDateInput" ng-model="COL_FIELD" /></div>'
            }
        ],
        plugins: [new ngGridFlexibleHeightPlugin()]
    };
            
    $scope.heirGridOptions = { 
        data: 'Heirs',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [
            { 
                field: 'TSHeirID', 
                displayName: '', 
                enableCellEdit: false,
                sortable: false,
                groupable: false,
                width: 24,
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><i ng-click="deleteHeir(row.entity)" title="Delete Heir" class="link glyphicon glyphicon-remove"></i></div>' 
            },
            { 
                field: 'IsMinor', 
                displayName: 'Minor', 
                width: 55,
                enableCellEdit: false,
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><input type="checkbox" style="margin: 5px;" ng-model="COL_FIELD" /></div>'
            },
            { 
                field: 'IsMale', 
                displayName: 'Male', 
                width: 50,
                enableCellEdit: false,
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><input type="checkbox" style="margin: 5px;" ng-model="COL_FIELD" /></div>'
            },
            { 
                field: 'IsCharity', 
                displayName: 'Charity', 
                width: 60,
                enableCellEdit: false,
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><input type="checkbox" style="margin: 5px;" ng-model="COL_FIELD" /></div>'
            },
            { field: 'FirstName', displayName: 'First Name / Charity Name', width: 230 },
            { field: 'MiddleName', displayName: 'Middle', width: 70 },
            { field: 'LastName', displayName: 'Last Name', width: 110 },
            { field: 'RelationshipToDecedent', displayName: 'Relationship', width: 200 },
            { field: 'StreetAddress', displayName: 'Address', width: 250 },
            { field: 'City', displayName: 'City', width: 120 },
            { field: 'State', displayName: 'State', width: 100 },
            { field: 'Zip', displayName: 'Zip', width: 100 },
            { field: 'Country', displayName: 'Country (if not USA)', width: 150 },
            { 
                field: 'IsDisinherited', 
                displayName: 'Disinherit', 
                width: 80,
                enableCellEdit: false,
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><input type="checkbox" style="margin: 5px;" ng-model="COL_FIELD" /></div>'
            },
            { 
                field: 'IsSpecificBequest', 
                displayName: 'Spec. Beq.', 
                width: 90,
                enableCellEdit: false,
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><input type="checkbox" style="margin: 5px;" ng-model="COL_FIELD" /></div>'
            },
            { field: 'SpecificGift', displayName: 'Specific Gift Description', width: 200 },
            { field: 'SSN', displayName: 'SSN', width: 100 },
            { field: 'Phone', displayName: 'Phone', width: 120 },
            { field: 'Phone2', displayName: 'Phone 2', width: 120 },
            { field: 'Email', displayName: 'Email', width: 200 },
            { 
                field: '_Birthdate', 
                displayName: 'Birthdate', 
                width: 100,
                enableCellEdit: false,
                cellTemplate: '<div ng-class="col.colIndex()"><input type="text" ui-date="uiDateOptions" class="ngCellDateInput" ng-model="COL_FIELD" /></div>'
            }
        ],
        plugins: [new ngGridFlexibleHeightPlugin()]
    };
    
    //Scope and Watches
    self.addWatches = function(){
        $scope.$watch('selectedPreparer', function(newValue, oldValue){
            $scope.Settlement.PreparerID = newValue.EmployeeID;
        });
        $scope.$watch('selectedAttorney', function(newValue, oldValue){
            $scope.Settlement.AttorneyID = newValue.EmployeeID;
        });
        $scope.$watch('selectedNotary', function(newValue, oldValue){
            $scope.Settlement.NotaryID = newValue.EmployeeID;
        });
        $scope.$watch('selectedParalegal', function(newValue, oldValue){
            $scope.Settlement.ParalegalID = newValue.EmployeeID;
        });
    };
    
    //Getting Initial data
    self.init = function () {
        self.addWatches();
        self.getData();
    };
    self.getData = function () {
        //Get All data in one shot
        var trustSettlementID = $scope.TrustSettlementID;
        if (trustSettlementID == null){
            trustSettlementID = -1;
        }
        BLAPI.get('TrustSettlements/Edit?TrustSettlementID=' + trustSettlementID, function (data) {
            var Settlement = data.Settlement;
            var Settlements = data.Settlements;
            
//            var TrustSettlementID = $scope.TrustSettlementID;
//            if (TrustSettlementID != null) {
//                var Settlement = _.find(Settlements, function (item) {
//                    //Do only == since the TrustSettlementID routeParam is a string (e.g. '1')
//                    return item.TrustSettlementID == TrustSettlementID;
//                });
//            }
            
            //Employees
            $scope.Preparers = data.Employees.Preparers;
            $scope.Attorneys = data.Employees.Attorneys;
            $scope.Paralegals = data.Employees.Paralegals;
            $scope.Notaries = data.Employees.Notaries;
                
            //Courthouses
            data.Courthouses.splice(0,0,{P15409CourthouseID: null});
            $scope.Courthouses = data.Courthouses;
            
            $scope.Settlements = Settlements;
            
            if (Settlement != null){
                utils.createShadowDateProperties(Settlement, settlementDateFields);
                utils.setBooleanProperties(Settlement, SettlementBooleanFields);
                $scope.Settlement = Settlement;
                $scope.hasSettlement = true;
                
                //The selected Preparer is the one save to the database, otherwise set it to the default
                var PreparerID = Settlement.PreparerID;
                if (PreparerID != null){
                    $scope.selectedPreparer = _.find($scope.Preparers, function(item){
                        return item.EmployeeID === PreparerID;
                    });
                }else{
                    $scope.selectedPreparer = _.find($scope.Preparers, function(item){
                        return item.IsDefaultForRole == true; 
                    });
                }

                var AttorneyID = Settlement.AttorneyID;
                if (AttorneyID != null){
                    $scope.selectedAttorney = _.find($scope.Attorneys, function(item){
                        return item.EmployeeID === AttorneyID;
                    });
                }else{
                    $scope.selectedAttorney = _.find($scope.Attorneys, function(item){
                        return item.IsDefaultForRole == true; 
                    });
                }

                var NotaryID = Settlement.NotaryID;
                if (NotaryID != null){
                    $scope.selectedNotary = _.find($scope.Notaries, function(item){
                        return item.EmployeeID === NotaryID;
                    });
                }else{
                    $scope.selectedNotary = _.find($scope.Notaries, function(item){
                        return item.IsDefaultForRole == true; 
                    });
                }

                var ParalegalID = Settlement.ParalegalID;
                if (ParalegalID != null){
                    $scope.selectedParalegal = _.find($scope.Paralegals, function(item){
                        return item.EmployeeID === ParalegalID;
                    });
                }else{
                    $scope.selectedParalegal = _.find($scope.Paralegals, function(item){
                        return item.IsDefaultForRole == true; 
                    });
                }
                
                //Courthouse selection
                var P15409CourthouseID = Settlement.P15409CourthouseID;
                if (P15409CourthouseID != null){
                    $scope.SelectedCourthouse = _.find($scope.Courthouses, function(item){
                        return item.CourthouseID === P15409CourthouseID;
                    });
                }
                
            }else{
                $scope.hasSettlement = false;
            }
                
            
            //Clients
            var Clients = data.Clients;
            for(var i = 0; i < Clients.length; i++){
                var item = Clients[i];
                utils.setBooleanProperties(item, ClientsBooleanFields);
                utils.createShadowDateProperties(item, ClientsDateFields);
            }
            //Add a dummy row if empty
            if (Clients.length == 0){
                Clients.push(
                    {
                        TSClientID: newClientID--,
                        TrustSettlementID: $scope.TrustSettlementID,
                        IsMale: false,
                        IsPrimary: true
                    }
                );
            }
            $scope.Clients = Clients;
    
            //Heirs
            var Heirs = data.Heirs;
            utils.setBooleanProperties(Heirs, HeirsBooleanFields);
            utils.createShadowDateProperties(Heirs, HeirsDateFields);
//            for(var i = 0; i < Heirs.length; i++){
//                var item = Heirs[i];
//                utils.setBooleanProperties(item, HeirsBooleanFields);
//                utils.createShadowDateProperties(item, HeirsDateFields);
//            }
            //Add a dummy row if empty
            $scope.Heirs = Heirs;
            
            //Trustors
            var Trustors = data.Trustors;
            utils.setBooleanProperties(Trustors, TrustorsBooleanFields);
            $scope.Trustors = data.Trustors;
            
            $scope.settlementEmptyOption = 'Please Select a Settlement';
            $scope.data = data;
        }); //end getData callback
    };//end getData
    
    self.validateSettlement = function(settlement){       
        var isValid = utils.hasValidTextFields(settlement, ['FileName', 'DecedentFirstName', 'DecedentLastName']);
        //console.log('here ' + isValid);
//        isValid = isValid && utils.hasValidDateFields(settlement, ['DateOfDeath']); 
        return isValid;
    };                                                
    
    //Other Handlers
    $scope.saveSettlement = function () {   
        if (utils.canProcess()){
            var Settlement = $scope.Settlement;
            var Clients = $scope.Clients;
            var Heirs = $scope.Heirs;

            utils.mergeShadowDateProperties(Settlement, settlementDateFields);  
            utils.mergeShadowDateProperties(Clients, ClientsDateFields);   
            utils.mergeShadowDateProperties(Heirs, HeirsDateFields);   

            var isValid = self.validateSettlement(Settlement);                    
            if (isValid) {
//                var postData = {
//                    Settlement: Settlement,
//                    Clients: Clients,
//                    Heirs: Heirs,
//                    Trustors: $scope.Trustors
//                };
                
                var postData = $scope.data;
                BLAPI.post('TrustSettlements/Edit', postData, function (data) {
                    utils.setMessage('Saved');
                    self.getData();
                });
            }else{
                utils.setMessage('Cannot save. Missing fields!', 'warning');
            }
        }
    };
    
    $scope.addClient = function(){
        if (utils.canProcess()){
            $scope.Clients.push(
                {
                    TSClientID: newClientID--,
                    TrustSettlementID: $scope.TrustSettlementID,
                    IsMale: false,
                    IsPrimary: $scope.Clients.length == 0 ? true : false
                }
            );   
        }
    };
    $scope.deleteClient = function(client){
        if (utils.canProcess()){
            var TSClientID = client.TSClientID;
            //console.log(TSClientID);
            if (TSClientID > 0){
                var confirmDelete = confirm('Are you sure you want to delete the client?');
                if (confirmDelete){
                    var postData = {
                        FilterType: 'Delete',
                        TSClientID: TSClientID 
                    };
                    BLAPI.post('TrustSettlements/Client', postData, function(data){
                        utils.setMessage('Client deleted')
                        self.getData();
                    });
                }
            }else {
                $scope.Clients = _.pull($scope.Clients, client);
            }
            //dlg = $dialogs.notify('Something Happened!','Something happened that I need to tell you.');
        }
    };
    
    //Trustors
    $scope.addTrustor = function(){
        if (utils.canProcess()){
            $scope.Trustors.push(
                {
                    TSTrustorID: newID--,
                    TrustSettlementID: $scope.TrustSettlementID,
                    IsMale: false
                }
            );   
        }
    };
    $scope.deleteTrustor = function(obj){
        if (utils.canProcess()){
            var TSTrustorID = obj.TSTrustorID;
            //console.log(TSTrustorID);
            if (TSTrustorID > 0){
                var confirmDelete = confirm('Are you sure you want to delete the client?');
                if (confirmDelete){
                    var postData = {
                        FilterType: 'Delete',
                        TSTrustorID: TSTrustorID 
                    };
                    BLAPI.post('TrustSettlements/Trustor?FilterType=Delete', postData, function(data){
                        utils.setMessage('Trustor deleted')
                        self.getData();
                    });
                }
            }else {
                $scope.Trustors = _.pull($scope.Trustors, client);
            }
            //dlg = $dialogs.notify('Something Happened!','Something happened that I need to tell you.');
        }
    };

    
    $scope.addHeir = function(){
        if (utils.canProcess()){
            $scope.Heirs.push(
                {
                    TSHeirID: newHeirID--,
                    TrustSettlementID: $scope.TrustSettlementID,
                    IsMale: false,
                    IsMinor: false,
                    IsDisinherited: false
                }
            );
        }
    };
    $scope.deleteHeir = function(heir){
        if (utils.canProcess()){
            var TSHeirID = heir.TSHeirID;
            if (TSHeirID > 0){
                var confirmDelete = confirm('Are you sure you want to delete the beneficiary?');
                if (confirmDelete){
                    var postData = {
                        FilterType: 'Delete',
                        TSHeirID: TSHeirID 
                    };
                    BLAPI.post('TrustSettlements/Heirs?FilterType=Delete', postData, function(data){
                        utils.setMessage('Beneficiary deleted')
                        self.getData();
                    });
                }
            }else {
                $scope.Heirs = _.pull($scope.Heirs, heir);
            }
        }
    };



    
    //Always call initialize
    self.init();

}]);