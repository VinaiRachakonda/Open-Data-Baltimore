/**
 * Created by vinairachakonda on 12/29/16.
 */

angular.module('myApp')
    .service('salaryDataService', ['$http', function ($http) {

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

            service.getData = function (agency1, yr) {

                if (agency1 === "All") {
                    return $http.get(service.getYear2(yr.toString()))
                        .then(function (response) {
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
                            var salary0301 = 0;
                            var salary30601 = 0;
                            var salary60901 = 0;
                            var salary901 = 0;

                            for (var i = 0; i < data11.length; i++) {
                                var arr = data11[i];

                                if (arr[11].substring(0, agency1.length) === agency1.toString()) {

                                    var curr = arr[13];

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
                            return [salary0301, salary30601, salary60901, salary901];
                        })
                }
            };
            return service;
        };


        this.byDecade = function () {

            var service = {};

            service.getData1 = function (agy) {

                if (agy === "All") {

                    return $http.get('https://data.baltimorecity.gov/api/views/65ac-s4v5/rows.json?accessType=DOWNLOAD') //11
                        .then(function (response) {
                            var data11 = response.data.data;
                            var dec60s = 0;
                            var sal60 = 0;
                            var dec70s = 0;
                            var sal70 = 0;
                            var dec80s = 0;
                            var sal80 = 0;
                            var dec90s = 0;
                            var sal90 = 0;
                            var dec20s = 0;
                            var sal20 = 0;
                            var dec21s = 0;
                            var sal21 = 0;


                            for (var i = 0; i < data11.length; i++) { //12
                                var arr = data11[i];
                                var curr = parseInt(arr[12].substring(0, 5));
                                var sal = parseFloat(arr[13]);
                                if (curr > 1960 && curr < 1970) {
                                    dec60s++;
                                    sal60 = sal60 + sal;
                                } else if (curr > 1970 && curr < 1980) {
                                    dec70s++;
                                    sal70 = sal70 + sal;
                                } else if (curr > 1980 && curr < 1990) {
                                    dec80s++;
                                    sal80 = sal80 + sal;
                                } else if (curr > 1990 && curr < 2000) {
                                    dec90s++;
                                    sal90 = sal90 + sal;
                                } else if (curr > 2000 && curr < 2010) {
                                    dec20s++;
                                    sal20 = sal20 + sal;
                                } else if (curr > 2010 && curr < 2020) {
                                    dec21s++;
                                    sal21 = sal21 + sal;
                                }

                            }

                            return [(sal60 / dec60s).toFixed(2), (sal70 / dec70s).toFixed(2), (sal80 / dec80s).toFixed(2),
                                (sal90 / dec90s).toFixed(2), (sal20 / dec20s).toFixed(2), (sal21 / dec21s).toFixed(2)];


                        })
                }
                else {
                    return $http.get('https://data.baltimorecity.gov/api/views/65ac-s4v5/rows.json?accessType=DOWNLOAD') //11
                        .then(function (response) {
                            var data11 = response.data.data;
                            var dec60s = 0;
                            var sal60 = 0;
                            var dec70s = 0;
                            var sal70 = 0;
                            var dec80s = 0;
                            var sal80 = 0;
                            var dec90s = 0;
                            var sal90 = 0;
                            var dec20s = 0;
                            var sal20 = 0;
                            var dec21s = 0;
                            var sal21 = 0;


                            for (var i = 0; i < data11.length; i++) { //12
                                var arr = data11[i];
                                if (arr[11].substring(0, agy.length) === agy.toString()) {
                                    var curr = parseInt(arr[12].substring(0, 5));
                                    var sal = parseFloat(arr[13]);
                                    if (curr > 1960 && curr < 1970) {
                                        dec60s++;
                                        sal60 = sal60 + sal;
                                    } else if (curr > 1970 && curr < 1980) {
                                        dec70s++;
                                        sal70 = sal70 + sal;
                                    } else if (curr > 1980 && curr < 1990) {
                                        dec80s++;
                                        sal80 = sal80 + sal;
                                    } else if (curr > 1990 && curr < 2000) {
                                        dec90s++;
                                        sal90 = sal90 + sal;
                                    } else if (curr > 2000 && curr < 2010) {
                                        dec20s++;
                                        sal20 = sal20 + sal;
                                    } else if (curr > 2010 && curr < 2020) {
                                        dec21s++;
                                        sal21 = sal21 + sal;
                                    }
                                }
                            }

                            return [(sal60 / dec60s).toFixed(2), (sal70 / dec70s).toFixed(2), (sal80 / dec80s).toFixed(2),
                                (sal90 / dec90s).toFixed(2), (sal20 / dec20s).toFixed(2), (sal21 / dec21s).toFixed(2)];

                        })
                }
            };
            return service;
        }


    }]);