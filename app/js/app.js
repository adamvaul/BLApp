'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', [
    'ngRoute',
    'ngSanitize',
    'pascalprecht.translate',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers',
    'ngGrid',
    'ui.bootstrap',
    'ui.date',
    'angularCurrencyInput'
]);

myApp.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

        //        $locationProvider.html5Mode(true);

        //TrustSettlements Module routes
        $routeProvider.when('/TrustSettlements/Clients', {
            templateUrl: 'modules/TrustSettlements/Clients/TSClients.html',
            controller: 'TSClientsController'
        });
        $routeProvider.when('/TrustSettlements/AllStatus', {
            templateUrl: 'modules/TrustSettlements/AllStatus/AllStatus.html',
            controller: 'TSAllStatusController',
            reloadOnSearch: false
        });
        $routeProvider.when('/TrustSettlements/Status', {
            templateUrl: 'modules/TrustSettlements/Status/Status.html',
            controller: 'TSStatusController',
            reloadOnSearch: false
        });
        $routeProvider.when('/TrustSettlements/Edit', {
            templateUrl: 'modules/TrustSettlements/Edit/EditSettlement.html',
            controller: 'EditSettlementController',
            reloadOnSearch: false
        });
        $routeProvider.when('/TrustSettlements/Assets', {
            templateUrl: 'modules/TrustSettlements/EditAssets/EditTSAssets.html',
            controller: 'EditTSAssetsController',
            reloadOnSearch: false
        });
        $routeProvider.when('/TrustSettlements/Documents', {
            templateUrl: 'modules/TrustSettlements/Documents/TSDocuments.html',
            controller: 'TSDocumentsController',
            reloadOnSearch: false
        });

        //WillsTrusts Module routes
        $routeProvider.when('/WillsTrusts/Clients', {
            templateUrl: 'modules/WillsTrusts/Clients/WTClients.html',
            controller: 'WTClientsController'
        });

        $routeProvider.otherwise({
            redirectTo: '/TrustSettlements/Clients'
        });
    }]);

//Create a shell for the other controllers
var controllers = angular.module('myApp.controllers', []);

//The root controller
controllers.controller('AppController', ['$scope', '$rootScope', '$timeout',
    function ($scope, $rootScope, $timeout) {
        var self = this;

        $scope.safeApply = function (fn) {
            var phase = this.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (fn && (typeof (fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };

        //Navigation Stuff
        $rootScope.TrustSettlementID = null;

        $rootScope.$watch('TrustSettlementID', function (newVal, oldVal) {
            var TrustSettlementID = newVal;
            var sublinks = $scope.links[0].sublinks;
            if (TrustSettlementID != null) {
                //Start at one to avoid the clients route
                for (var i = 1; i < sublinks.length; i++) {
                    var item = sublinks[i];
                    if (item.hasTrustSettlementID){
                        item.href = '#/TrustSettlements/' + item.name + '?TrustSettlementID=' + TrustSettlementID;
                    }
                    //                    item.isHidden = false;
                }
            } else {
                for (var i = 1; i < sublinks.length; i++) {
                    var item = sublinks[i];
                    item.href = '#/TrustSettlements/' + item.name;
                    //                    if (!item.showAlways) {
                    //                        item.isHidden = true;
                    //                    }
                }
            }
            $scope.links[0].sublinks = sublinks;
            //            console.log(sublinks[1]);
        });

        $scope.links = [
            {
                name: 'TS',
                text: 'Settlements',
                href: '#/TrustSettlements/Clients',
                isActive: true,
                sublinks: [
                    {
                        name: 'Clients',
                        text: 'Clients',
                        href: '#/TrustSettlements/Clients',
                        showAlways: true,
                        isHidden: false,
                        isActive: true,
                        hasTrustSettlementID: false
                    },
                    {
                        name: 'AllStatus',
                        text: 'All Status',
                        href: '#/TrustSettlements/AllStatus',
                        showAlways: true,
                        isHidden: false,
                        isActive: false,
                        hasTrustSettlementID: false
                    },
                    {
                        name: 'Status',
                        text: 'Status',
                        href: '#/TrustSettlements/Status',
                        showAlways: true,
                        isHidden: false,
                        isActive: false,
                        hasTrustSettlementID: true
                    },
                    {
                        name: 'Edit',
                        text: 'Edit',
                        href: '#/TrustSettlements/Edit',
                        showAlways: false,
                        isHidden: true,
                        isActive: false,
                        hasTrustSettlementID: true
                    },
                    {
                        name: 'Assets',
                        text: 'Edit Assets',
                        href: '#/TrustSettlements/Assets',
                        showAlways: false,
                        isHidden: true,
                        isActive: false,
                        hasTrustSettlementID: true
                    },
                    {
                        name: 'Documents',
                        text: 'Documents',
                        href: '#/TrustSettlements/Documents',
                        showAlways: true,
                        isHidden: false,
                        isActive: false,
                        hasTrustSettlementID: true
                    }
                ]
            },
            {
                name: 'WT',
                text: 'Wills/Trusts',
                href: '#/WillsTrusts/Clients',
                isActive: false,
                sublinks: [
                    {
                        name: 'Clients',
                        text: 'Clients',
                        href: '#/WillsTrusts/Clients',
                        showAlways: true,
                        isHidden: true,
                        isActive: false
                    }
                ]
            }
        ];
        $scope.sublinks = $scope.links[0].sublinks;
        $rootScope.setActiveLinks = function (ModuleName, SubName) {
            var links = $scope.links;
            var activeLink = {};
            for (var i = 0; i < links.length; i++) {
                var item = links[i];
                if (item.name == ModuleName) {
                    item.isActive = true
                    activeLink = item;
                    var sublinks = item.sublinks;
                    for (var j = 0; j < sublinks.length; j++) {
                        var innerItem = sublinks[j];
                        if (innerItem.name == SubName) {
                            innerItem.isActive = true;
                        } else {
                            innerItem.isActive = false;
                        }
                    }
                } else {
                    item.isActive = false;
                }
            }
            $scope.sublinks = activeLink.sublinks;
        };

        //        <li class="active dropdown">
        //            <a class="pre-mini" href="#/TrustSettlements/Clients">Trust Settlements</a>
        //            <a href="#" class="dropdown-toggle mini" data-toggle="dropdown"><b class="caret"></b></a>
        //            <ul class="dropdown-menu">
        //                <li><a href="#/WTClients">WTClients</a>
        //                </li>
        //                <li><a href="#">Another action</a>
        //                </li>
        //                <li><a href="#">Something else here</a>
        //                </li>
        //                <li class="divider"></li>
        //                <li class="dropdown-header">Nav header</li>
        //                <li><a href="#">Separated link</a>
        //                </li>
        //                <li><a href="#">One more separated link</a>
        //                </li>
        //            </ul>
        //        </li>
        //        <li><a href="#/WillsTrusts/Clients">Wills/Trusts</a>
        //        </li>


        //Alerts stuff
        $scope.alerts = [];
        //        $scope.alerts = [
        //            {
        //                type: 'danger',
        //                msg: 'Oh snap! Change a few things up and try submitting again.'
        //            },
        //            {
        //                type: 'success',
        //                msg: 'Well done! You successfully read this important alert message.'
        //            }
        //          ];
        $scope.closeAlert = function (alert) {
            $scope.alerts = _.pull($scope.alerts, alert);
        };
        $rootScope.setMessage = function (msg, type) {
            if (type == null) {
                type = 'success';
            }
            var alert = {
                type: type,
                msg: msg
            };
            $scope.alerts.unshift(alert);
            //Remove any alert after a few seconds, unless its an error
            if (type !== 'danger') {
                $timeout(function () {
                    $scope.alerts = _.pull($scope.alerts, alert);
                }, 3000);
            }
        };
        
        //showBusyIndicator
        $rootScope.showTheBusyIndicator = true;
        $rootScope.showBusyIndicator = function(){
            $rootScope.showTheBusyIndicator = true;
        }
        $rootScope.hideBusyIndicator = function(){
            $rootScope.showTheBusyIndicator = false;
        }
        
        
        $rootScope.getDecedentFullName = function (Settlement) {
            var fullName = '';
            if (Settlement.DecedentFirstName){
                fullName += Settlement.DecedentFirstName;
            }
            if (Settlement.DecedentMiddleName){
                fullName += ' ' + Settlement.DecedentMiddleName;
            }
            if (Settlement.DecedentLastName){
                fullName += ' ' + Settlement.DecedentLastName;
            }
            return fullName;
        };

}]);