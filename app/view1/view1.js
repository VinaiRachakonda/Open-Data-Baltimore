'use strict';

angular.module('myApp.view1', ['ngRoute', 'chart.js'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', '$http', '$timeout', 'salaryDataService', 'yearChangeService',
        function ($scope, $http, $timeout, salaryDataService, yearChangeService) {

            $scope.chart = {
                type: 'pie', // pie | bar
                chartData: salaryDataService.myFunc(yearChangeService.getYear()).then(function (data) {
                    $scope.chart.chartData = data;
                }),
                labels: ["0 - $30,000", "$30,000 - $60,000", "$60,000 - $90,000", "$90,000+"]

        };


    }])


    .controller('yearFilterOptions', ['$scope', 'yearChangeService', function ($scope, yearChangeService) {
        $scope.year = '2016'; // 2016 | 2015 | 2014
        $scope.options = [2016, 2015, 2014];

        $scope.year2 = '';


        $scope.changeYear = function (y) {
            $scope.year2 = y;
            yearChangeService.setYear($scope.year2);
            console.log(yearChangeService.getYear());
        }


    }])





