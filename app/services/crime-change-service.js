/**
 * Created by vinairachakonda on 1/7/17.
 */

angular.module('myApp.view1')
    .service('crimeChangeService', ['$rootScope', function ($rootScope) {

        //service stuff
        var service = {};
        service.crime = 'Crime-Rate';
        service.setCrimeType = function (c) {
            service.crime = c;
            $rootScope.$broadcast('crime:updated',service.crime);
        };

        service.getCrimeType = function () {
            return service.crime;
        };

        return service;
    }]);