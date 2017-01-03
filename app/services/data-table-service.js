/**
 * Created by vinairachakonda on 1/3/17.
 */
angular.module('myApp.view3')
    .service('dataTableService', ['$http', function ($http) {

        //service stuff
        var service = {};

        service.getData = function () {
            return $http.get('https://data.baltimorecity.gov/api/views/65ac-s4v5/rows.json?accessType=DOWNLOAD') //11
                .then(function (response) {
                    var data11 = response.data.data;
                    var ret = [];

                    for (var i = 0; i< data11.length; i++){
                        var arr = data11[i];
                        var elmt = {
                            "Name": arr[8],
                            "Job Title": arr[9],
                            "Agency": arr[11],
                            "Salary": arr[13],
                        };
                        ret.push(elmt);


                    }
                    return ret;
                })


        };

        return service;
    }]);