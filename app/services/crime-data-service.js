/**
 * Created by vinairachakonda on 1/6/17.
 */
//https://data.baltimorecity.gov/api/views/qmw9-b8ep/rows.json?accessType=DOWNLOAD

angular.module('myApp.view1')
    .service('crimeDataService', ['$http', function ($http) {

        //service stuff
        var service = {};

        service.getData = function (yr, type) {
            return $http.get("https://data.baltimorecity.gov/api/views/qmw9-b8ep/rows.json?accessType=DOWNLOAD").then(
                function (response) {
                    var data = response.data.data;

                    var ret = [];
                    var selected = 13;
                    if (type === 'Crime-Rate'){
                        if (yr === '2014'){
                            selected = 13;
                        }else if(yr === '2013'){
                            selected = 12;
                        }else if(yr === '2012'){
                            selected = 11;
                        }
                    }else{
                        if (yr === '2014'){
                            selected = 18;
                            console.log("Here");
                        }else if(yr === '2013'){
                            selected = 17;
                        }else if(yr === '2012'){
                            selected = 16;
                        }
                    };

                    for (var i = 0; i < data.length; i++) {
                        var curr = data[i];
                        var el = {
                            "neighborhood": curr[8],
                            "crime10": curr[9],
                            "crime11": curr[10],
                            "crime12": curr[11],
                            "crime13": curr[12],
                            "crime14": curr[13],
                            "viol10": curr[14],
                            "viol11": curr[15],
                            "viol12": curr[16],
                            "viol13": curr[17],
                            "viol14": curr[18],
                            "selected": curr[selected]
                        };
                        ret.push(el);
                    }

                    // return x.data.features;
                    return ret;
                }
            )
        };
        return service;
    }]);