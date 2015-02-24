'use strict';

/* Controllers */

var controllers = angular.module('myApp.controllers');

controllers.controller('TSDocumentsController', ['$scope', '$location', '$routeParams', '$timeout', 'BLAPI', 'utils',
function ($scope, $location, $routeParams, $timeout, BLAPI, utils) {
        var self = this;

        //Set Active Links
        utils.setActiveLinks('TS', 'Documents');
        $scope.utils = utils;
    
        //Set new TrustSettlementID
        $scope.TrustSettlementID = utils.setTrustSettlementID($routeParams.TrustSettlementID);
    
        self.processing = false;


        //Set new bindings
        $scope.Settlements = [];
        $scope.Settlement = {};
        $scope.hasSettlement = false;
        $scope.Forms = [];

        $scope.allFormsSelected = false;

        $scope.settlementChanged = function () {
            //            console.log('changed');
            var TrustSettlementID = $scope.Settlement.TrustSettlementID;
            $scope.TrustSettlementID = TrustSettlementID;
            $location.search('TrustSettlementID', TrustSettlementID);
            utils.setTrustSettlementID(TrustSettlementID);
            self.getData();
        };

        $scope.selectAllForms = function () {
            if (utils.canProcess()) {
                $scope.allFormsSelected = !$scope.allFormsSelected;
                var Forms = $scope.Forms;
                for (var i = 0; i < Forms.length; i++) {
                    var item = Forms[i];
                    item._isSelected = $scope.allFormsSelected;
                }
            }
        };

        $scope.formSelected = function () {
            if (self.processing === false) {
                self.processing = true; //This will be reset

                $timeout(function () {
                    if ($scope.allFormsSelected) {
                        $scope.allFormsSelected = false;
                    } else {
                        var Forms = $scope.Forms;
                        var selectedForms = self.getSelectedForms();
                        if (selectedForms.length == Forms.length) {
                            $scope.allFormsSelected = true;
                        }
                    }
                }, 0);

                $timeout(function () {
                    self.processing = false;
                }, 0);
            }
        };

        self.getSelectedForms = function () {
            var selectedForms = [];
            var Forms = $scope.Forms;
            for (var i = 0; i < Forms.length; i++) {
                var item = Forms[i];
                if (item._isSelected) {
                    selectedForms.push(item);
                }
            }
            return selectedForms;
        }

        $scope.getSelectedFormsClick = function () {
            if (utils.canProcess()) {
                var TSFormIDs = [];
                var selectedForms = self.getSelectedForms();
                for (var i = 0; i < selectedForms.length; i++) {
                    var item = selectedForms[i];
                    TSFormIDs.push(item.TSFormID);
                }
                var postData = {
                    TSFormIDs: TSFormIDs
                };
                self.getForm(postData);
            }
        };

        $scope.getFormClick = function (form) {
            if (self.processing === false) {
                self.processing = true; //This will be reset
                var postData = {
                    TSFormID: form.TSFormID
                };
                self.getForm(postData);
                //Reset the flag after two seconds
                $timeout(function () {
                    self.processing = false;
                }, 2000);
            }
        };

        self.getForm = function (postData) {
            var TrustSettlementID = $scope.Settlement.TrustSettlementID;
            if (TrustSettlementID == null) {
                utils.setMessage('Please select a settlement', 'warning');
            } else {
                postData.TrustSettlementID = TrustSettlementID;
                BLAPI.post('TrustSettlements/GenerateDocument', postData, function (data) {
                    var fileData = data;
//                    alert(fileData);
                    BLAPI.open(fileData);
                });
            }
        };


        $scope.testClick = function () {
            //        BLAPI.post('Test/ConvertWordDocs', null, function (data) {
            //            console.log(data);
            //        });
        };



        self.init = function () {
            self.getData();
        };

        self.getData = function () {
            var trustSettlementID = $scope.TrustSettlementID;
            if (trustSettlementID == null){
                trustSettlementID = -1;
            }
            BLAPI.get('TrustSettlements/Documents?TrustSettlementID=' + trustSettlementID, function (data) {
                $scope.data = data;
                $scope.Forms = data.Forms;
                var Settlements = data.Settlements;
                var Settlement = data.Settlement;

//                var TrustSettlementID = $scope.TrustSettlementID;
//                if (TrustSettlementID != null) {
//                    Settlement = _.find(Settlements, function (item) {
//                        //Do only == since the TrustSettlementID routeParam is a string (e.g. '1')
//                        return item.TrustSettlementID == TrustSettlementID;
//                    });
//                }
                
                if (Settlement != null){
                    $scope.Settlement = Settlement;
                    $scope.hasSettlement = true;
                }else{
                    $scope.hasSettlement = false;
                }
                
                $scope.Settlements = Settlements;
                
                $scope.settlementEmptyOption = 'Please Select a Settlement';
            });
        };

        self.init();

}]);