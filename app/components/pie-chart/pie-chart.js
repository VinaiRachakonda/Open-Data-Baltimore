(function () {

    angular.module('myApp.view1')
        .directive('pieChart', function () {
            return {
                templateUrl: 'components/pie-chart/pie-chart.html',
                scope: {},
                restrict: 'E',
                controller: Controller,
                controllerAs: 'vm',
                bindToController: {
                    data: '=',
                }
            };
        });


    function Controller($scope) {
        var vm = this;

        vm.title = 'Pie Chart Title';
    }

})();

