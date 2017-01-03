'use strict';

angular.module('myApp.view2', ['ngRoute', 'chart.js'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])

    .controller('View2Ctrl', ['$scope', '$http', '$window', 'salaryDataService', 'agencyChangeService2',
        function ($scope, $http, $window, salaryDataService, agencyChangeService2) {


            $scope.$on('$destroy', function resetEverything() {
                // $window.location.reload(); //reload the page to reset all state
                agencyChangeService2.setAgency("All");
                salaryDataService.byDecade().getData1(agencyChangeService2.getAgency().toString()).then(
                    function (data) {
                        console.log($scope.agency);
                        console.log(data);
                        $scope.data3 = data;
                        $scope.chart.chartData = [$scope.data3];
                    }
                )
            });


            $scope.$on('agency2:updated', function (event, data1) {
                $scope.agency = agencyChangeService2.getAgency();
                salaryDataService.byDecade().getData1(agencyChangeService2.getAgency().toString()).then(
                    function (data) {
                        console.log($scope.agency);
                        console.log(data);
                        $scope.data3 = data;
                        $scope.chart.chartData = [$scope.data3];
                    }
                )
            });

            $scope.chart = {
                type: 'line', // line | radar
                chartData: salaryDataService.byDecade().getData1(agencyChangeService2.getAgency()).then(function (data) {
                    $scope.chart.chartData = [data];
                }),
                labels: ["1960s", "1970s", "1980s", "1990s", "2000s", "2010s"]
            };


        }])


    .controller('agencyFilterOptions2', ['$scope', '$http', 'agencyChangeService2',
        function ($scope, $http, agencyChangeService2) {

            $scope.options1 = ["All", "Mayors Office", "Police Department", "Fire Department"];

            $scope.changeAgency = function (a) {
                agencyChangeService2.setAgency(a.toString());
            };


        }]);