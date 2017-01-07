/**
 * Created by vinairachakonda on 1/6/17.
 */
angular.module('myApp.view1')
    .service('geojsonParseService', ['$http', 'crimeDataService', function ($http, crimeDataService) {

        //service stuff
        var service = {};
        var crimeData = [];
        service.determineColor = function (da, type) { //crime rate per 1000 citizen
            if (type === "Crime-Rate") {
                if (da >= 100) {
                    return "#646464";
                }
                else if (da >= 75) {
                    //return "#FF3200"
                    return "#f03b20"
                }
                else if (50 < da && da < 75) {
                    return "#feb24c";
                } else {
                    return "#ffeda0";
                }
            }
            else{
                if (da >= 50){
                    return "#ce1256"
                }else if(da > 20 && da < 50) {
                    return "#df65b0"
                } else if(da > 10 && da < 20){
                    return "#d7b5d8"
                } else {
                    return "#f1eef6"
                }
            }
        };

        service.getData = function (yr, type) {
            return $http.get("http://localhost:8000/app/baltimore2.json").then(
                function (response) {
                    console.log("local json read");

                    var x = angular.fromJson(response);
                    var ret = [];

                    crimeDataService.getData(yr, type).then(
                        function (data) {
                            crimeData = data;

                            for (var i = 0; i < x.data.features.length; i++) {
                                var curr = x.data.features[i];
                                curr.properties.newProperties = crimeData[i];
                                curr.properties.color = service.determineColor(parseInt(
                                    angular.fromJson(curr.properties.newProperties.selected)), type);
                                ret.push(curr);

                            }
                        }
                    );


                    return ret;


                }
            )


        };


        return service;
    }]);