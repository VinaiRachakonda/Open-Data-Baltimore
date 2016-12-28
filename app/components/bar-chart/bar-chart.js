/**
 * Created by vinairachakonda on 12/28/16.
 */
(function () {

    angular.module('myApp.view1')
        .directive('barChart', function () {
            return {
                templateUrl: 'components/bar-chart/bar-chart.html',
                scope: {},
                restrict: 'E',
                controller: Controller,
                controllerAs: 'vm',
                bindToController: {
                    data: '=',
                    labels: '='
                },
            };
        });


    function Controller($scope, $element) {
        var vm = this;

        vm.title = 'Bar Chart Title';


    }
})();

