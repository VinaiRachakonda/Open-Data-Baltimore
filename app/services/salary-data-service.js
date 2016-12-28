/**
 * Created by vinairachakonda on 12/27/16.
 */

(function () {
    angular.module('myApp.view1')
        .service('salaryDataService', serviceFunction)


    function serviceFunction($http) {
        this.myFunc = function () {
            return $http.get("https://data.baltimorecity.gov/api/views/nsfe-bg53/rows.json?accessType=DOWNLOAD")
                .then(function (response) {
                    console.log("Data has been read!");
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

                        var agency1 = arr[10]; //674 agencies

                        if (agencies.indexOf(agency1) === -1) {
                            agencies.push(agency1);
                        }
                    }
                    console.log(salaries.length);
                    console.log("Calling pie script");
                    return [salary030, salary3060, salary6090, salary90];
                })
        }
    }

})();


