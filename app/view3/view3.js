/**
 * Created by vinairachakonda on 1/3/17.
 */

angular.module('myApp.view3', ['ngRoute', 'chart.js', 'ui.grid', 'ui.grid.resizeColumns', 'ui.bootstrap'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view3', {
            templateUrl: 'view3/view3.html',
            controller: 'View3Ctrl'
        });
    }])

    .controller('View3Ctrl', [ '$scope', '$http', 'dataTableService', 'uiGridConstants',
                function ($scope, $http, dataTableService, uiGridConstants) {


        $scope.gridOptions = {
            enableFiltering: true,
            onRegisterApi: function(gridApi){
                $scope.gridApi = gridApi;
            },
            data: dataTableService.getData().then( function (data) {
                    $scope.gridOptions.data = data;
                }

            )
        };


    }]);
