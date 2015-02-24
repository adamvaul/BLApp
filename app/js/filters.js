'use strict';

/* Filters */

var filters = angular.module('myApp.filters', []);

filters.filter('interpolate', ['version',
    function (version) {
        return function (text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        };
  }]);

filters.filter('reverse', function () {
    return function (items) {
        if (items && items.length > 0){
            return items.slice().reverse();
        }
        else{
            return items;
        }
    };
});