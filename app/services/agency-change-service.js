/**
 * Created by vinairachakonda on 1/1/17.
 */
/**
 * Created by vinairachakonda on 12/29/16.
 */

angular.module('myApp.view1')
    .service('agencyChangeService', ['$rootScope', function ($rootScope) {

        //service stuff
        var service = {};
        service.agency = 'All';
        service.setAgency = function (yr) {
            service.agency = yr;
            $rootScope.$broadcast('agency:updated',service.agency);
        };

        service.getAgency = function () {
            return service.agency;
        };

        return service;
    }]);