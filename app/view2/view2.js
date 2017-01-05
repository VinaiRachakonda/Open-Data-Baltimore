'use strict';

angular.module('myApp.view2', ['ngRoute', 'chart.js'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])

    .controller('View2Ctrl', ['$scope', '$http', '$window', 'salaryDataService', 'dataTableService', 'publicArtService',
        'agencyChangeService2', 'chartChangeService', 'yearChangeService',
        function ($scope, $http, $window, salaryDataService, dataTableService, publicArtService, agencyChangeService2
            ,chartChangeService, yearChangeService) {


            $scope.$on('$destroy', function resetEverything() {
                // $window.location.reload(); //reload the page to reset all state
                chartChangeService.setChartType("AvgSal");
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
                );
                salaryDataService.byAgency().getData($scope.agency, '2016').then(
                    function (data) {
                        console.log(data);
                        $scope.data3 = data;
                        $scope.chart2.chartData2 = $scope.data3;
                    }
                )
            });

            $scope.$on('year:updated', function (event, data) {
                salaryDataService.byAgency().getData(agencyChangeService2.getAgency(),yearChangeService.getYear().toString()).then(
                    function (data) {
                        console.log(agencyChangeService2.getAgency() + " " + yearChangeService.getYear());
                        console.log(data);
                        $scope.data2 = data;
                        $scope.chart2.chartData2 = $scope.data2;
                    }
                )

            });

            $scope.$on('chart:updated', function () {
                $scope.visualizationOptions.type = chartChangeService.getChartType();
            });

            $scope.visualizationOptions = {
                type: chartChangeService.getChartType()// | raw | Ranges
            };

            $scope.chart = {
                type: 'line', // line | bar
                chartData: salaryDataService.byDecade().getData1(agencyChangeService2.getAgency()).then(function (data) {
                    $scope.chart.chartData = [data];
                }),
                labels: ["1960s", "1970s", "1980s", "1990s", "2000s", "2010s"]
            };

            $scope.chart2 = {
                type2: 'bar', // bar | pie
                chartData2: salaryDataService.byAgency().getData(agencyChangeService2.getAgency(), '2016').then(function (data) {
                    $scope.chart2.chartData2 = data;
                }),
                labels2: ["0 - $30,000", "$30,000 - $60,000", "$60,000 - $90,000", "$90,000+"]
            };


            $scope.gridOptions = {
                enableFiltering: true,
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                },
                data: dataTableService.getData().then(function (data) {
                        $scope.gridOptions.data = data;
                    }
                )
            }

        }])

    .controller('agencyFilterOptions2', ['$scope', '$http', 'agencyChangeService2',
        function ($scope, $http, agencyChangeService2) {

            $scope.options1 = ["All", "Mayors Office", "Police Department", "Fire Department"];

            $scope.changeAgency = function (a) {
                agencyChangeService2.setAgency(a.toString());
            };


        }])

    .controller('publicArt', ['$scope', 'publicArtService', function ($scope, publicArtService) {
        $scope.chart = {
            type: 'line', // line | radar
            chartData: publicArtService.getData().then(
                function (data) {
                    $scope.chart.chartData = [data];
                }
            ),
            labels: ["1960s", "1970s", "1980s", "1990s", "2000s", "2010s"],
            colors: ['rgba(247,70,74,1)', 'rgba(70,191,189,1)']
        };
    }])

    .controller('visualizationOptions', ['$scope', 'chartChangeService',
        function ($scope, chartChangeService) {

            $scope.init = 'AvgSal';

            $scope.changeChart = function (a) {
                chartChangeService.setChartType(a);
            };
        }])

    .controller('yearFilterOptions2', ['$scope', 'yearChangeService', 'chartChangeService',
                function ($scope, yearChangeService, chartChangeService) {
        $scope.year = '2016'; // 2016 | 2015 | 2014
        $scope.options = [2016, 2015, 2014];

        // $scope.currChart = 'AvgSal';
        //
        // $scope.$on('chart:updated2', function () {
        //     console.log("yello");
        //     $scope.currChart = chartChangeService.getChartType();
        // });

        $scope.changeYear = function (y) {
            yearChangeService.setYear(y);
        };

    }])

