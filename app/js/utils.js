'use strict';

// Demonstrate how to register services
// In this case it is a simple value service.
var services = angular.module('myApp.services');

//A collection of helpful utility functions
services.factory('utils', ['$rootScope', '$http', '$timeout', '$filter',
    function ($rootScope, $http, $timeout, $filter) {
        var utils = {};

        //App-wide functions
        var processing = false;
        utils.canProcess = function () {
            if (processing === false) {
                processing = true;
                $timeout(function () {
                    processing = false;
                }, 125);
                return true;
            } else {
                return false;
            }
        };

        //Settlements
        utils.setTrustSettlementID = function (TrustSettlementID) {
            var trustSettlementID = utils.parseNumber(TrustSettlementID);
            if (trustSettlementID != null) {
                $rootScope.TrustSettlementID = trustSettlementID;
            }
            return $rootScope.TrustSettlementID;
        };

        //Messaging
        utils.setMessage = function (msg, type) {
            $rootScope.setMessage(msg, type);
        };

        utils.setActiveLinks = function (ModuleName, SubName) {
            $rootScope.setActiveLinks(ModuleName, SubName);
        };


        //Parsing and Formatting
        //
        //

        //Gets a js date object if it can be parsed, else returns null.
        utils.parseNumber = function (value) {
            if (value == null) {
                return null;
            } else {
                var floatVal = parseFloat(value);
                if (_.isNaN(floatVal)) {
                    return null;
                } else {
                    return floatVal;
                }
            }
        };

        //Gets a js date object if it can be parsed, else returns null.
        utils.getDate = function (value) {
            if (value == null) {
                return null;
            } else {
                var momentDate = moment(value);
                if (momentDate.isValid()) {
                    return momentDate.toDate();
                } else {
                    return null;
                }
            }
        };

        //Gets a formatted date string valid for xml, else returns null.
        utils.formatURLDate = function (value) {
            if (value == null) {
                return null;
            } else {
                var momentDate = moment(value);
                if (momentDate.isValid()) {
                    return momentDate.format('YYYY-MM-DD');
                } else {
                    return null;
                }
            }
        };

        utils.formatCurrency = function (value) {
            console.log(value);
            if (value == null || value == "") {
                return value;
            } else {
                return $filter('currency')(value);
            }
        };

        utils.hasValidTextFields = function (item, fieldsArray) {
            for (var i = 0; i < fieldsArray.length; i++) {
                var field = fieldsArray[i];
                var value = item[field];
                if (value == null || value === '') {
                    return false;
                }
            }
            return true;
        };

        utils.hasValidDateFields = function (item, fieldsArray) {
            for (var i = 0; i < fieldsArray.length; i++) {
                var field = fieldsArray[i];
                var value = item[field];
                if (moment(value).isValid() === false) {
                    return false;
                }
            }
            return true;
        };

        //Adds a js Date property like _DateOfDeath from DateOfDeath property for each field specified.
        utils.createShadowDateProperties = function (obj, fieldsArray) {
            if (_.isArray(obj)) {
                for (var i = 0; i < obj.length; i++) {
                    var item = obj[i];
                    utils.createShadowDatePropertiesForObject(item, fieldsArray);
                }
            } else {
                utils.createShadowDatePropertiesForObject(obj, fieldsArray);
            }
        };
        utils.createShadowDatePropertiesForObject = function (item, fieldsArray) {
            for (var i = 0; i < fieldsArray.length; i++) {
                var field = fieldsArray[i];
                utils.createShadowDateProperty(item, field);
                //                console.log(item);
            }
        };
        utils.createShadowDateProperty = function (item, field) {
            var value = item[field];
            var shadowField = '_' + field;
            var shadowValue = utils.getDate(value);
            item[shadowField] = shadowValue;
        };

        utils.setBooleanProperties = function (obj, fieldsArray) {
            if (_.isArray(obj)) {
                for (var i = 0; i < obj.length; i++) {
                    var item = obj[i];
                    utils.setBooleanPropertiesForObject(item, fieldsArray);
                }
            } else {
                utils.setBooleanPropertiesForObject(obj, fieldsArray);
            }
        };
        utils.setBooleanPropertiesForObject = function (item, fieldsArray) {
            for (var i = 0; i < fieldsArray.length; i++) {
                var field = fieldsArray[i];
                utils.setBooleanProperty(item, field);
            }
        };
        utils.setBooleanProperty = function (item, field) {
            item[field] = item[field] == 'true' ? true : false;
        };


        utils.mergeAccountsDateProperties = function (obj, DateFields) {
            if (obj){
                for (var i = 0; i < obj.length; i++) {
                    var item = obj[i];
                    var _Accounts = item._Accounts;
                    utils.mergeShadowDateProperties(_Accounts, DateFields);
                }
            }
        };
        //Takes the underscore properties created from createShadowDateProperties and merges them back in to properties specified.
        utils.mergeShadowDateProperties = function (obj, fieldsArray) {
            if (obj){
                if (_.isArray(obj)) {
                    for (var i = 0; i < obj.length; i++) {
                        var item = obj[i];
                        utils.mergeShadowDatePropertiesForObject(item, fieldsArray);
                    }
                } else {
                    utils.mergeShadowDatePropertiesForObject(obj, fieldsArray);
                }
            }
        };
        utils.mergeShadowDatePropertiesForObject = function (item, fieldsArray) {
            for (var j = 0; j < fieldsArray.length; j++) {
                var field = fieldsArray[j];
                utils.mergeShadowDateProperty(item, field);
            }
        };
        utils.mergeShadowDateProperty = function (item, field) {
            var shadowField = '_' + field;
            var shadowValue = item[shadowField];
            var value = utils.formatURLDate(shadowValue);
            item[field] = value;
        };


        var AssetsDateFields = ['RequestSent'];
        var AssetsBooleanFields = ['IsDone', 'FormsReceived'];
        utils.getAssets = function (data) {
            //Assets
            var Assets = [];
            var _AssetNumber = 1;
            var _AssetGroupLabel = '';
            var _AssetType = '';

            var Vehicles = data.Vehicles;
            if (Vehicles && Vehicles.length > 0) {
                _AssetGroupLabel = _AssetNumber+++'. Vehicles';
                for (var i = 0; i < Vehicles.length; i++) {
                    var item = Vehicles[i];
                    if (item.ShortName == null) {
                        if (item.Make != null){
                            item.ShortName = item.Make;
                        }
                    }
                    item._AssetType = 'Vehicle';
                    item._AssetGroupLabel = _AssetGroupLabel;
                    item._AssetNumber = _AssetNumber;
                    item._HideForms = true;
                    Assets.push(item);
                }
            }

            var Properties = data.Properties;
            if (Properties && Properties.length > 0) {
                _AssetGroupLabel = _AssetNumber+++'. Properties';
                for (var i = 0; i < Properties.length; i++) {
                    var item = Properties[i];
                    if (item.ShortName == null) {
                        if (item.StreetAddress != null){
                            item.ShortName = item.StreetAddress;
                        } else {
                            item.ShortName = item.City + ", " + item.State;
                        }
                    }
                    item._AssetType = 'Property';
                    item._AssetGroupLabel = _AssetGroupLabel;
                    item._AssetNumber = _AssetNumber;
//                    item._HideForms = true;
                    Assets.push(item);
                }
            }

            var Mortgages = data.Mortgages;
            if (Mortgages && Mortgages.length > 0) {
                _AssetGroupLabel = _AssetNumber+++'. Mortgages';
                for (var i = 0; i < Mortgages.length; i++) {
                    var item = Mortgages[i];
                    item._AssetType = 'Mortgage';
                    item._AssetGroupLabel = _AssetGroupLabel;
                    item._AssetNumber = _AssetNumber;
                    Assets.push(item);
                }
            }

            var Banks = data.Banks;
            if (Banks && Banks.length > 0) {
                for (var i = 0; i < Banks.length; i++) {
                    var item = Banks[i];
                    _AssetGroupLabel = _AssetNumber+++'. Bank - ' + item.ShortName;
                    var _Accounts = item._Accounts;
                    for (var j = 0; j < _Accounts.length; j++) {
                        var _Account = _Accounts[j];
                        if (_Account.ShortName == null) {
                            _Account.ShortName = _Account.AccountNumber + ' ' + _Account.AccountType;
                        }
                        _Account._AssetType = 'BankAccount';
                        _Account._AssetGroupLabel = _AssetGroupLabel;
                        _Account._AssetNumber = _AssetNumber;
                        _Account._HideForms = true;
                        Assets.push(_Account);
                    }
                }
            }

            var Brokers = data.Brokers;
            if (Brokers && Brokers.length > 0) {
                for (var i = 0; i < Brokers.length; i++) {
                    var item = Brokers[i];
                    _AssetGroupLabel = _AssetNumber+++'. Broker - ' + item.ShortName;
                    var _Accounts = item._Accounts;
                    for (var j = 0; j < _Accounts.length; j++) {
                        var _Account = _Accounts[j];
                        if (_Account.ShortName == null) {
                            _Account.ShortName = _Account.AccountNumber;
                        }
                        _Account._AssetType = 'BrokerAccount';
                        _Account._AssetGroupLabel = _AssetGroupLabel;
                        _Account._AssetNumber = _AssetNumber;
                        Assets.push(_Account);
                    }
                }
            }

            var Stocks = data.Stocks;
            if (Stocks && Stocks.length > 0) {
                for (var i = 0; i < Stocks.length; i++) {
                    var item = Stocks[i];
                    _AssetGroupLabel = _AssetNumber+++'. Stock - ' + item.ShortName;
                    var _Accounts = item._Accounts;
                    for (var j = 0; j < _Accounts.length; j++) {
                        var _Account = _Accounts[j];
                        if (_Account.ShortName == null) {
                            _Account.ShortName = _Account.AccountNumber;
                        }
                        _Account._AssetType = 'StockAccount';
                        _Account._AssetGroupLabel = _AssetGroupLabel;
                        _Account._AssetNumber = _AssetNumber;
                        Assets.push(_Account);
                    }
                }
            }

            var USBonds = data.USBonds;
            if (USBonds && USBonds.length > 0) {
                _AssetGroupLabel = _AssetNumber+++'. US Bonds';
                for (var i = 0; i < USBonds.length; i++) {
                    var item = USBonds[i];
                    if (item.ShortName == null) {
                        item.ShortName = item.SerialNumber;
                    }
                    item._AssetType = 'USBond';
                    _Account._AssetType = 'BankAccount';
                    item._AssetGroupLabel = _AssetGroupLabel;
                    item._AssetNumber = _AssetNumber;
                    Assets.push(item);
                }
            }

            var LifeInsurance = data.LifeInsurance;
            if (LifeInsurance && LifeInsurance.length > 0) {
                for (var i = 0; i < LifeInsurance.length; i++) {
                    var item = LifeInsurance[i];
                    _AssetGroupLabel = _AssetNumber+++'. Life Insurance - ' + item.ShortName;
                    var _Accounts = item._Accounts;
                    for (var j = 0; j < _Accounts.length; j++) {
                        var _Account = _Accounts[j];
                        if (_Account.ShortName == null) {
                            _Account.ShortName = _Account.AccountNumber;
                        }
                        _Account._AssetType = 'LifeInsuranceAccount';
                        _Account._AssetGroupLabel = _AssetGroupLabel;
                        _Account._AssetNumber = _AssetNumber;
                        Assets.push(_Account);
                    }
                }
            }

            var IRA = data.IRA;
            if (IRA && IRA.length > 0) {
                for (var i = 0; i < IRA.length; i++) {
                    var item = IRA[i];
                    _AssetGroupLabel = _AssetNumber+++'. IRA - ' + item.ShortName;
                    var _Accounts = item._Accounts;
                    for (var j = 0; j < _Accounts.length; j++) {
                        var _Account = _Accounts[j];
                        if (_Account.ShortName == null) {
                            _Account.ShortName = _Account.AccountNumber + ' ' + _Account.AccountType;
                        }
                        _Account._AssetType = 'IRAAccount';
                        _Account._AssetGroupLabel = _AssetGroupLabel;
                        _Account._AssetNumber = _AssetNumber;
                        Assets.push(_Account);
                    }
                }
            }

            var Annuity = data.Annuity;
            if (Annuity && Annuity.length > 0) {
                for (var i = 0; i < Annuity.length; i++) {
                    var item = Annuity[i];
                    _AssetGroupLabel = _AssetNumber+++'. Annuity - ' + item.ShortName;
                    var _Accounts = item._Accounts;
                    for (var j = 0; j < _Accounts.length; j++) {
                        var _Account = _Accounts[j];
                        if (_Account.ShortName == null) {
                            _Account.ShortName = _Account.AccountNumber;
                        }
                        _Account._AssetType = 'AnnuityAccount';
                        _Account._AssetGroupLabel = _AssetGroupLabel;
                        _Account._AssetNumber = _AssetNumber;
                        Assets.push(_Account);
                    }
                }
            }

            var MiscAsset = data.MiscAsset;
            if (MiscAsset && MiscAsset.length > 0) {
                _AssetGroupLabel = _AssetNumber+++'. Miscellaneous';
                for (var i = 0; i < MiscAsset.length; i++) {
                    var item = MiscAsset[i];
                    item._AssetType = 'MiscAsset';
                    item._AssetGroupLabel = _AssetGroupLabel;
                    item._AssetNumber = _AssetNumber;
                    Assets.push(item);
                }
            }

            utils.createShadowDateProperties(Assets, AssetsDateFields);
            utils.setBooleanProperties(Assets, AssetsBooleanFields);

            return Assets;
        };

        utils.processAssets = function (items, settlement) {
            var totalEstate = 0,
                trustATotal = 0,
                trustBTotal = 0,
                trustCTotal = 0,
                otherTotal = 0,
                estimatedValue = 0,
                estimatedTrustATotal = 0,
                estimatedTrustBTotal = 0,
                estimatedTrustCTotal = 0,
                estimatedOtherTotal = 0;
            
            if (settlement.PersonalPropertyDODValue != null){
                totalEstate += settlement.PersonalPropertyDODValue;      
                trustATotal += settlement.PersonalPropertyDODValue;        
                estimatedValue += settlement.PersonalPropertyDODValue;
                estimatedTrustATotal += settlement.PersonalPropertyDODValue;
            }
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                
                if (item.IsDone === true) {
                    item._IsDoneText = "Completed";
                } else {
                    item._IsDoneText = "Pending";
                }

                //Default OwnerTypes
                if (item.OwnerTypeID == null) {
                    if (item._AssetType === 'LifeInsuranceAccount' || item._AssetType === 'IRAAccount' || item._AssetType === 'AnnuityAccount' || item._AssetType === 'MiscAsset') {
                        item.OwnerTypeID = 2; //Other
                    } else {
                        item.OwnerTypeID = 1; //Trust (A)
                    }
                }
                
                //OwnerType name
                if (item.OwnerTypeID == 2) {
                    item.OwnerType = "Other";
                } else if (item.OwnerTypeID == 3) {
                    item.OwnerType = "Trust B";
                } else {
                    item.OwnerType = "Trust";
                }
                
                if (item._AssetType == "BankAccount") {
                    if (item.DODValue == null && (item.DODPrincipal != null || item.DODInterest!= null)){
                        item.DODValue = item.DODPrincipal + item.DODInterest;
                    }
                }
                
                if (item._AssetType == "StockAccount") {
                    if (item.DODValue == null && item.DODNumberShares != null && item.DODPricePerShare != null){
                        item.DODValue = item.DODNumberShares * item.DODPricePerShare;
                    }
                }
                
                //If EstimatedValue is blank use the DODValue if we have it
                if (item.EstimatedValue == null && item.DODValue != null) {
                    item.EstimatedValue = item.DODValue;
                }
                
                if (item._AssetType == "Mortgage") {
                    if (item.DODValue != null){
                        totalEstate -= item.DODValue;
                        if (item.OwnerTypeID == 2){
                            otherTotal -= item.DODValue;
                        }else if (item.OwnerTypeID == 3){
                            trustBTotal -= item.DODValue;
                        }else if (item.OwnerTypeID == 4){
                            trustCTotal -= item.DODValue;
                        }else{
                            trustATotal -= item.DODValue;
                        }
                    }
                    if (item.EstimatedValue != null){
                        estimatedValue -= item.EstimatedValue;
                        if (item.OwnerTypeID == 2){
                            estimatedOtherTotal -= item.EstimatedValue;
                        }else if (item.OwnerTypeID == 3){
                            estimatedTrustBTotal -= item.EstimatedValue;
                        }else if (item.OwnerTypeID == 4){
                            estimatedTrustCTotal -= item.EstimatedValue;
                        }else{
                            estimatedTrustATotal -= item.EstimatedValue;
                        }
                    }
                } else {
                    if (item.DODValue != null){
                        totalEstate += item.DODValue;
                        if (item.OwnerTypeID == 2){
                            otherTotal += item.DODValue;
                        }else if (item.OwnerTypeID == 3){
                            trustBTotal += item.DODValue;
                        }else if (item.OwnerTypeID == 4){
                            trustCTotal += item.DODValue;
                        }else{
                            trustATotal += item.DODValue;
                        }
                    }
                    if (item.EstimatedValue != null){
                        estimatedValue += item.EstimatedValue;
                        if (item.OwnerTypeID == 2){
                            estimatedOtherTotal += item.EstimatedValue;
                        }else if (item.OwnerTypeID == 3){
                            estimatedTrustBTotal += item.EstimatedValue;
                        }else if (item.OwnerTypeID == 4){
                            estimatedTrustCTotal += item.EstimatedValue;
                        }else{
                            estimatedTrustATotal += item.EstimatedValue;
                        }
                    }
                }
                
            }//end for loop through items

            return {
                totalEstate: totalEstate,
                trustATotal:trustATotal,
                trustBTotal:trustBTotal,
                trustCTotal:trustCTotal,
                otherTotal:otherTotal,
                estimatedValue: estimatedValue,
                estimatedTrustATotal:estimatedTrustATotal,
                estimatedTrustBTotal:estimatedTrustBTotal,
                estimatedTrustCTotal:estimatedTrustCTotal,
                estimatedOtherTotal:estimatedOtherTotal
            };
        };

        return utils;
}]);