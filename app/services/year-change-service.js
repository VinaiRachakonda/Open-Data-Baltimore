/**
 * Created by vinairachakonda on 12/29/16.
 */
( function () {
    angular.module('myApp.view1')
        .service('yearChangeService', yearServiceFunction)

    function yearServiceFunction() { //should have getter and setter
        var service = {};
        var year  = '2016';
        service.setYear = function (yr) {
            year = yr;
        };

        service.getYear = function () {
            return year;
        };

        return service;

    }
})();