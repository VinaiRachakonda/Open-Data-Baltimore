/**
 * Created by vinairachakonda on 1/3/17.
 */

angular.module('myApp.view3', ['ngRoute', 'chart.js'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view3', {
            templateUrl: 'view3/view3.html',
            controller: 'View3Ctrl'
        });
    }])

    .controller('View3Ctrl',[ function () {

    }])
