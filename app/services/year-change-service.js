/**
 * Created by vinairachakonda on 12/29/16.
 */

angular.module('myApp')
        .service('yearChangeService', ['$rootScope', function ($rootScope) {

            //service stuff
            var service = {};
            service.year = '2016';
            service.setYear = function (yr) {
                service.year = yr;
                $rootScope.$broadcast('year:updated',service.year);
            };

            service.getYear = function () {
                return service.year;
            };

            return service;
        }]);