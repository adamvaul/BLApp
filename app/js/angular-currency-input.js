'use strict';

/* Directives */


var angularCurrencyInput = angular.module('angularCurrencyInput', []);


angularCurrencyInput.directive('angularCurrencyInput', ['$timeout', '$filter',
    function ($timeout, $filter) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, ctrl) {
                
                //Set the watch
                scope.$watch(attrs.ngModel, function () {
                    if (element[0] != document.activeElement) {
                        setInputValue();
                    }
                });

                //function to return null or actual currency value
                var formatCurrency = function (value) {
                    if (value == null || value == "") {
                        return null;
                    } else {
                        return $filter('currency')(value);
                    }
                };

                //function to get the value for the model object from the scope
                var getModelValue = function () {
                    return scope.$eval(attrs.ngModel);
                };

                //function to return empty text (i.e. null) if its null or undefined
                var getTextValue = function (value) {
                    if (value == null) {
                        return null;
                    } else {
                        return value;
                    }
                };

                var setInputValue = function () {
                    $timeout(function () {
                        var data = getModelValue();
                        var currencyVal = formatCurrency(data);
                        element[0].value = currencyVal;
                    }, 0);
                };

                //Set the value to the actual raw value for editing
                element.bind('focus', function () {
                    var data = getModelValue();
                    element[0].value = getTextValue(data);
                });

                //But see it as formatted currency
                element.bind('blur', function () {
                    setInputValue();
                });


                //Set the initial formatted value as currency
                setInputValue();

            }
        };
}]);