/**
 * Created by vinairachakonda on 1/5/17.
 */

angular.module('myApp.view2')
    .service('chartChangeService', ['$rootScope', function ($rootScope) {

        //service stuff
        var service = {};
        service.chart = 'AvgSal';
        service.setChartType = function (c) {
            service.chart = c;
            $rootScope.$broadcast('chart:updated',service.chart);
        };

        service.getChartType = function () {
            return service.chart;
        };

        return service;
    }]);