/**
 * Created by vinairachakonda on 12/26/16.
 */
$http.get("https://data.baltimorecity.gov/api/views/nsfe-bg53/rows.json?accessType=DOWNLOAD")
    .then(function (response) {
        console.log("Data has been read!");
        $scope.data1 = response.data.data;z
        $scope.salaries = [];
        $scope.agencies = [];
        var salary030 = 0;
        var salary3060 = 0;
        var salary6090 = 0;
        var salary90 = 0;

        for (var i = 0; i < $scope.data1.length; i++) {
            var arr = $scope.data1[i];
            var curr = arr[13];
            $scope.salaries.push(curr);

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

            if ($scope.agencies.indexOf(agency1) === -1) {
                $scope.agencies.push(agency1);
            }
        }
        console.log($scope.salaries.length);
        console.log("Calling pie script");

        var ctx = document.getElementById("pie").getContext("2d");

        var pie = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ["0 - $30,000", "$30,000 - $60,000", "$60,000 - $90,000", "$90,000+"],
                datasets: [{
                    label: '# of People',
                    data: [salary030, salary3060, salary6090, salary90],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        });
    })





