'use strict';

angular.module('myApp.view1', ['ngRoute', 'chart.js'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', '$http', '$timeout', 'salaryDataService',
        function ($scope, $http, $timeout, salaryDataService) {

            $scope.chart = {
                type: 'pie', // pie | bar
                chartData: salaryDataService.myFunc().then(function (data) {
                    $scope.chart.chartData = data;
                }),
                labels: ["0 - $30,000", "$30,000 - $60,000", "$60,000 - $90,000", "$90,000+"]

        };

            // $timeout(function () {
            //     salaryDataService.myFunc().then(function (data) {
            //         $scope.chart.pieData = data;
            //     });
            // }, 2000);


        }])


    .controller('filterOptions', ['$scope', function ($scope) {
        $scope.options = [2015, 2014, 2013];
    }])

    .controller("PieCtrl", function ($scope) {
        $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        $scope.data = [300, 500, 100];
    });




