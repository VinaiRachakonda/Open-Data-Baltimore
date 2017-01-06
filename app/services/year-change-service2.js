/**
 * Created by vinairachakonda on 1/7/17.
 */
/**
 * Created by vinairachakonda on 12/29/16.
 */

angular.module('myApp.view2')
    .service('yearChangeService2', ['$rootScope', function ($rootScope) {

        //service stuff
        var service = {};
        service.year = '2016';
        service.setYear = function (yr) {
            service.year = yr;
            $rootScope.$broadcast('year2:updated',service.year);
        };

        service.getYear = function () {
            return service.year;
        };

        return service;
    }]);