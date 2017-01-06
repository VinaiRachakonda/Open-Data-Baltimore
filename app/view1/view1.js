'use strict';

angular.module('myApp.view1', ['ngRoute', 'chart.js'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', '$http', '$timeout', '$window', 'salaryDataService',
                                'geojsonParseService', 'crimeChangeService', 'yearChangeService',
        function ($scope, $http, $timeout, $window, salaryDataService,
                  geojsonParseService, crimeChangeService, yearChangeService) {

            // $scope.yearChangeService = yearChangeService;
            // $scope.year = yearChangeService.year;

            $scope.$on('$destroy', function resetEveryThing() {
                //$window.location.reload(); //reload the page to reset all state
                agencyChangeService.setAgency("All");
                yearChangeService.setYear("2016");
                salaryDataService.byAgency().getData(agencyChangeService.getAgency(), yearChangeService.getYear().toString()).then(
                    function (data) {
                        console.log(agencyChangeService.getAgency() + " " + yearChangeService.getYear());
                        $scope.data2 = data;
                        $scope.chart.chartData = $scope.data2;
                    }
                )


            });

            $scope.$on('year:updated', function (event, data) {
                geojsonParseService.getData(yearChangeService.getYear(), crimeChangeService.getCrimeType()).then(
                    function (data) {
                        $scope.geojson.data.features = data;
                    }
                )
            });

            $scope.$on('crime:updated', function () {
               console.log("hey crime was updated!");
               geojsonParseService.getData(yearChangeService.getYear(), crimeChangeService.getCrimeType()).then(
                   function (data) {
                        $scope.geojson.data.features = data;
                   }
               )
            });

            angular.extend($scope, {
                baltimore: {
                    lat: 39.299236,
                    lng: -76.609383,
                    zoom: 12
                    // lng:  -76.65725678399687,
                    // lat: 39.27599375954768,
                    // zoom: 12
                },
                defaults: {
                    scrollWheelZoom: false
                }
            });

            angular.extend($scope, {
                geojson: {
                    data: {
                        "type": "FeatureCollection",
                        "features": geojsonParseService.getData(yearChangeService.getYear(), crimeChangeService.getCrimeType()).then(
                            function (data) {
                                $scope.geojson.data.features = data;
                            }
                        )
                    },
                    style: {
                        weight: 2,
                        opacity: 1,
                        color: 'black',
                        dashArray: '3',
                        fillOpacity: 0.7,
                    },
                    onEachFeature: function (feature, layer) {
                        layer.bindPopup(feature.properties.csa + "- " + angular.fromJson(feature.properties.newProperties.selected));
                        layer.setStyle({fillColor: feature.properties.color});

                    }
                }
            });
        }])


    .controller('yearFilterOptions', ['$scope', 'yearChangeService', function ($scope, yearChangeService) {
        $scope.year = '2014'; // 2016 | 2015 | 2014
        $scope.options = ['2014', '2013', '2012'];

        $scope.changeYear = function (y) {
            yearChangeService.setYear(y);
        };

    }])

    .controller('crimeTypeOptions', ['$scope','crimeChangeService', function ($scope, crimeChangeService) {
        $scope.options = ["Crime-Rate", "Violent-Crime"];
        $scope.changeCrime = function (a) {
            crimeChangeService.setCrimeType(a);
        };
    }])




