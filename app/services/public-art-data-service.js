/**
 * Created by vinairachakonda on 1/5/17.
 */
angular.module('myApp.view2')
    .service('publicArtService', ['$http', function ($http) {

        //service stuff
        var service = {};


        service.getData = function () {
            return $http.get('https://data.baltimorecity.gov/api/views/5xsg-uc29/rows.json?accessType=DOWNLOAD') //11
                .then(function (response) {
                    var data11 = response.data.data;
                    var dec60s = 0;
                    var dec70s = 0;
                    var dec80s = 0;
                    var dec90s = 0;
                    var dec20s = 0;
                    var dec21s = 0;

                    for (var i = 0; i< data11.length; i++){ //12
                        var arr = data11[i];
                        var curr = parseInt(arr[12]);
                        if (curr > 1960 && curr < 1970) {
                            dec60s++;
                        } else if (curr > 1970 && curr < 1980) {
                            dec70s++;
                        } else if (curr > 1980 && curr < 1990) {
                            dec80s++;
                        } else if (curr > 1990 && curr < 2000) {
                            dec90s++;
                        } else if (curr > 2000 && curr < 2010) {
                            dec20s++;
                        } else if (curr > 2010 && curr < 2020) {
                            dec21s++;
                        }
                    }
                    return [dec60s, dec70s, dec80s, dec90s, dec20s, dec21s];
                })


        };

        return service;
    }]);