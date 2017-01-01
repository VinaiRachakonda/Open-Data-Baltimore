/**
 * Created by vinairachakonda on 12/29/16.
 */

angular.module('myApp.view1')
    .service('salaryDataService', ['$http', '$rootScope', 'yearChangeService', function ($http, $rootScope, yearChangeService) {

        this.byAgency = function () {

            //Mayors Office, Police Department, Fire Department

            var service = {};

            service.getYear2 = function (yr) {
                if (yr === "2016") {
                    return 'https://data.baltimorecity.gov/api/views/65ac-s4v5/rows.json?accessType=DOWNLOAD';
                }
                else if (yr === "2015") {
                    return "https://data.baltimorecity.gov/api/views/nsfe-bg53/rows.json?accessType=DOWNLOAD";
                } else if (yr === "2014") {
                    return 'https://data.baltimorecity.gov/api/views/2j28-xzd7/rows.json?accessType=DOWNLOAD';
                }
            };

        service.getData = function (agency1,yr) {

            if (agency1 === "All") {
                return $http.get(service.getYear2(yr.toString()))
                    .then(function (response) {
                        console.log("9hkjk");
                        var data1 = response.data.data;
                        var salaries = [];
                        var agencies = [];
                        var salary030 = 0;
                        var salary3060 = 0;
                        var salary6090 = 0;
                        var salary90 = 0;

                        for (var i = 0; i < data1.length; i++) {
                            var arr = data1[i];
                            var curr = arr[13];
                            salaries.push(curr);

                            if (parseInt(curr) < 30000) {
                                salary030 = salary030 + 1;
                            }
                            else if (parseInt(curr) > 30000 && parseInt(curr) < 60000) {
                                salary3060 = salary3060 + 1;
                            }
                            else if (parseInt(curr) > 60000 && parseInt(curr) < 90000) {
                                salary6090 = salary6090 + 1;
                            }
                            else {
                                salary90 = salary90 + 1;
                            }


                        }
                        return [salary030, salary3060, salary6090, salary90];
                    })
            }
            else {
                return $http.get(service.getYear2(yr.toString())) //11
                    .then(function (response) {
                        var data11 = response.data.data;
                        var salaries1 = [];
                        var salary0301 = 0;
                        var salary30601 = 0;
                        var salary60901 = 0;
                        var salary901 = 0;

                        for (var i = 0; i < data11.length; i++) {
                            var arr = data11[i];

                            if (arr[11].substring(0,agency1.length) === agency1.toString()) {

                                var curr = arr[13];
                                salaries1.push(curr);

                                if (parseInt(curr) < 30000) {
                                    salary0301 = salary0301 + 1;
                                }
                                else if (parseInt(curr) > 30000 && parseInt(curr) < 60000) {
                                    salary30601 = salary30601 + 1;
                                }
                                else if (parseInt(curr) > 60000 && parseInt(curr) < 90000) {
                                    salary60901 = salary60901 + 1;
                                }
                                else {
                                    salary901 = salary901 + 1;
                                }

                            }
                        }
                        console.log(salary0301);
                        return [salary0301, salary30601, salary60901, salary901];
                    })
            }
        };
        return service;
    }


}])
;