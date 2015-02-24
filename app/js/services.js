'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var services = angular.module('myApp.services', []);

services.value('version', '0.1');

services.factory('BLAppConfig', function () {
    var BLAppConfig = {};

    BLAppConfig.BLAPIServer = '10.0.0.12';
//    BLAppConfig.BLAPIServer = '10.0.0.8';
//    BLAppConfig.BLAPIServer = 'assistant';
    BLAppConfig.BLAPIURL = 'http://' + BLAppConfig.BLAPIServer + '/BLAPI/api';
    BLAppConfig.ExportFileHandlerURL = 'http://' + BLAppConfig.BLAPIServer + '/BLAPI/ExportFile.ashx';

    return BLAppConfig;
});

services.factory('BLAPI', ['$rootScope', '$http', '$timeout', 'utils', 'BLAppConfig',
    function ($rootScope, $http, $timeout, utils, BLAppConfig) {
        var BLAPI = {};

        var setMessage = function (msg) {
            utils.setMessage(msg, 'danger');

            $timeout(function () {
                alert(msg);
            }, 0);
        };

        BLAPI.get = function (relativeURL, callback) {
            $rootScope.showBusyIndicator();
            $timeout(function () {
                var fullURL = BLAppConfig.BLAPIURL + '/' + relativeURL;
                $http({
                    method: 'GET',
                    url: fullURL
                }).
                success(function (data, status, headers, config) {
                    if (callback !== null) {
                        callback(data);
                    }
                    $rootScope.hideBusyIndicator();
                }).
                error(function (data, status, headers, config) {
                    console.log(data);
                    setMessage('Error on GET ' + fullURL + '. ' + data.ExceptionMessage);
                    $rootScope.hideBusyIndicator();
                });
            }, 0);
        };


        BLAPI.post = function (relativeURL, data, callback) {
            var fullURL = BLAppConfig.BLAPIURL + '/' + relativeURL;
            $rootScope.showBusyIndicator();
            $http({
                method: 'POST',
                url: fullURL,
                data: JSON.stringify(data)
            }).
            success(function (data, status, headers, config) {
                if (callback !== null) {
                    callback(data);
                }
                $rootScope.hideBusyIndicator();
            }).
            error(function (data, status, headers, config) {
                var err = data.ExceptionMessage;
                var msg = 'error on POST ' + fullURL + '. ' + err;
                setMessage(msg);
                $rootScope.hideBusyIndicator();
            });
        };


        BLAPI.open = function (fileData) {
            var exportHandlerURL = BLAppConfig.ExportFileHandlerURL;
            var url = exportHandlerURL + '?FilePath=' + encodeURIComponent(fileData);
            window.open(url, '_self');
        };
        
        
        //Documents Stuff
        BLAPI.getDocument = function (postData) {
            BLAPI.post('TrustSettlements/GenerateDocument', postData, function (data) {
                var fileData = data;
                BLAPI.open(fileData);
            });
        };

        return BLAPI;
}]);