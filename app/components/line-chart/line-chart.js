/**
 * Created by vinairachakonda on 1/3/17.
 */
(function () {

    angular.module('myApp.view2')
        .directive('lineChart', function () {
            return {
                templateUrl: 'components/line-chart/line-chart.html',
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

        vm.title = 'Line Chart Title';


    }
})();