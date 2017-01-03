/**
 * Created by vinairachakonda on 1/1/17.
 */

angular.module('myApp.view2')
    .service('agencyChangeService2', ['$rootScope', function ($rootScope) {

        //service stuff
        var service = {};
        service.agency = 'All';
        service.setAgency = function (yr) {
            service.agency = yr;
            $rootScope.$broadcast('agency2:updated',service.agency);
        };

        service.getAgency = function () {
            return service.agency;
        };

        return service;
    }]);