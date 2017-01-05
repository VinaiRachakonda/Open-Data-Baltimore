/**
 * Created by vinairachakonda on 1/3/17.
 */
(function () {

    angular.module('myApp.view2')
        .directive('radarChart', function () {
            return {
                templateUrl: 'components/radar-chart/radar-chart.html',
                scope: {},
                restrict: 'E',
                controller: Controller,
                controllerAs: 'vm',
                bindToController: {
                    data: '=',
                    labels: '=',
                    width: '=',
                    height: '=',
                },
            };
        });


    function Controller($scope, $element) {
        var vm = this;

        vm.title = 'Radar Chart Title';


    }
})();