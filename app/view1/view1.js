'use strict';

angular.module('myApp.view1', ['ngRoute', 'chart.js'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', '$http', '$timeout', '$window','salaryDataService', 'agencyChangeService', 'yearChangeService',
        function ($scope, $http, $timeout, $window, salaryDataService, agencyChangeService, yearChangeService) {

            // $scope.yearChangeService = yearChangeService;
            // $scope.year = yearChangeService.year;

            $scope.$on('$destroy', function resetEveryThing() {
                //$window.location.reload(); //reload the page to reset all state
                agencyChangeService.setAgency("All");
                yearChangeService.setYear("2016");
                salaryDataService.byAgency().getData(agencyChangeService.getAgency(),yearChangeService.getYear().toString()).then(
                    function (data) {
                        console.log(agencyChangeService.getAgency() + " " + yearChangeService.getYear());
                        $scope.data2 = data;
                        $scope.chart.chartData = $scope.data2;
                    }
                )



            });

            $scope.$on('year:updated', function (event, data) {
                salaryDataService.byAgency().getData(agencyChangeService.getAgency(),yearChangeService.getYear().toString()).then(
                    function (data) {
                        console.log(agencyChangeService.getAgency() + " " + yearChangeService.getYear());
                        console.log(data);
                        $scope.data2 = data;
                        $scope.chart.chartData = $scope.data2;
                    }
                )

            });

            $scope.$on('agency:updated', function (event, data1) {
                $scope.agency = agencyChangeService.getAgency();
               salaryDataService.byAgency().getData($scope.agency,yearChangeService.getYear().toString()).then(
                   function (data) {
                       console.log($scope.agency + " " + yearChangeService.getYear());
                       console.log(data);
                       $scope.data3 = data;
                       $scope.chart.chartData = $scope.data3;
                   }
               )
            });

            $scope.chart = {
                type: 'bar', // pie | bar
                chartData: salaryDataService.byAgency().getData(agencyChangeService.getAgency(),yearChangeService.getYear().toString()).then(function (data) {
                    $scope.chart.chartData = data;
                }),
                labels: ["0 - $30,000", "$30,000 - $60,000", "$60,000 - $90,000", "$90,000+"],

            };

            // $scope.$watch("yearChangeService.year", function (newVal, oldVal, scope) {
            //     if (newVal) {
            //         salaryDataService.myFunc(yearChangeService.getYear().toString()).then(
            //             function (data) {
            //                 console.log("Called with year" + " " + yearChangeService.getYear().toString());
            //                 $scope.data2 = data;
            //                 $scope.chart.chartData = $scope.data2;
            //             }
            //         );
            //
            //     }
            // }, true);

        }])


    .controller('yearFilterOptions', ['$scope', 'yearChangeService', function ($scope, yearChangeService) {
        $scope.year = '2016'; // 2016 | 2015 | 2014
        $scope.options = [2016, 2015, 2014];


        $scope.changeYear = function (y) {
            yearChangeService.setYear(y);
        };

    }])


    .controller('agencyFilterOptions1', ['$scope', '$http', 'agencyChangeService',
        function ($scope, $http, agencyChangeService) {

            $scope.options1 = ["All", "Mayors Office", "Police Department", "Fire Department"];

            $scope.changeAgency = function (a) {
                console.log("here");
                agencyChangeService.setAgency(a.toString());
            };


        }]);




