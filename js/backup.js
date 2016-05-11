var app = angular.module("iot", []);
var minutes = ["5min", "10min", "15min"];
app.controller("MainController",
    function ($scope, $http) {
        var url = 'http://localhost:7003';
        $scope.strings = {
            heading: "Intelligent Refrigerator",
        };
        var http_GET = 'GET';
        var judge = 0;
        function refresh_data() {
            $http({method: http_GET, url: url + '/data/'}).//put into a button condition
            then(function (response) {
                var tmp = response.data;
                if(judge == 0){
                    var data = {
                        labels: tmp.times, // x axis
                        datasets: [
                            {
                                label: "Humidity",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "rgba(7,19,19,0.4)",
                                borderColor: "rgba(7,19,19,1)",
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointBorderColor: "rgba(7,19,19,1)",
                                pointBackgroundColor: "#fff",
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: "rgba(7,19,19,1)",
                                pointHoverBorderColor: "rgba(220,220,220,1)",
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                                data: tmp.hums
                            },
                            {
                                label: "Temperature",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "rgba(32,100,127,0.4)",
                                borderColor: "rgba(32,100,127,1)",
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointBorderColor: "rgba(32,100,127,1)",
                                pointBackgroundColor: "#fff",
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: "rgba(32,100,127,1)",
                                pointHoverBorderColor: "rgba(220,220,220,1)",
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                                data: tmp.temps
                            }
                        ]
                    };
                    judge++;
                }
                else{
                    judge--;
                    var data = {
                        labels: tmp.times, // x axis
                        datasets: [
                            {
                                label: "Humidity",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "rgba(7,19,19,0.4)",
                                borderColor: "rgba(7,19,19,1)",
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointBorderColor: "rgba(7,19,19,1)",
                                pointBackgroundColor: "#fff",
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: "rgba(7,19,19,1)",
                                pointHoverBorderColor: "rgba(220,220,220,1)",
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                                data: tmp.temps
                            },
                            {
                                label: "Temperature",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "rgba(32,100,127,0.4)",
                                borderColor: "rgba(32,100,127,1)",
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointBorderColor: "rgba(32,100,127,1)",
                                pointBackgroundColor: "#fff",
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: "rgba(32,100,127,1)",
                                pointHoverBorderColor: "rgba(220,220,220,1)",
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                                data: tmp.hums
                            }
                        ]
                    };

                }

                var ctx = document.getElementById("myChart3").getContext("2d");
                var myBarChart = new Chart(ctx, {
                    type: 'line',
                    data: data,
                    options: {
                        xAxes: [{
                            display: false
                        }]
                    }
                });
            }, function (response) {
                alert("Fail!");
            });
        }
        $scope.refresh_data = refresh_data;
        refresh_data();

        $scope.minutes = minutes;
        $scope.my_select = "5min";
        function create_figure() {
            for(var i=0;i<minutes.length; i++){

            }
            $.getJSON("yxz5_6.json", function (data) {
                for(var i=0;i<minutes.length; i++) {
                    var period = minutes[i];
                    $.each(data[period], function (key, val) {
                        var time_stamps = {
                            label: "Time",
                            data: []
                        };

                        var light = {
                            label: "Light",
                            data: []
                        };
                        var temp = {
                            label: "Temp",
                            data: []
                        };

                        $.each(val, function (key, val) {
                            // [{} {} {}]  key -> num
                            time_stamps.data.push(val["Timestamp"]);
                            light.data.push(val["light of BME280 (lux)"]);
                            temp.data.push(val["temperature of BME280 (mDeg)"]);
                        });


                        var name = key + period;
                        var data = {
                            labels: time_stamps.data, // x axis
                            datasets: [
                                {
                                    label: light.label,
                                    fill: false,
                                    lineTension: 0.1,
                                    backgroundColor: "rgba(7,19,19,0.4)",
                                    borderColor: "rgba(7,19,19,1)",
                                    borderCapStyle: 'butt',
                                    borderDash: [],
                                    borderDashOffset: 0.0,
                                    borderJoinStyle: 'miter',
                                    pointBorderColor: "rgba(7,19,19,1)",
                                    pointBackgroundColor: "#fff",
                                    pointBorderWidth: 1,
                                    pointHoverRadius: 5,
                                    pointHoverBackgroundColor: "rgba(7,19,19,1)",
                                    pointHoverBorderColor: "rgba(220,220,220,1)",
                                    pointHoverBorderWidth: 2,
                                    pointRadius: 1,
                                    pointHitRadius: 10,
                                    data: light.data
                                },
                                {
                                    label: temp.label,
                                    fill: false,
                                    lineTension: 0.1,
                                    backgroundColor: "rgba(32,100,127,0.4)",
                                    borderColor: "rgba(32,100,127,1)",
                                    borderCapStyle: 'butt',
                                    borderDash: [],
                                    borderDashOffset: 0.0,
                                    borderJoinStyle: 'miter',
                                    pointBorderColor: "rgba(32,100,127,1)",
                                    pointBackgroundColor: "#fff",
                                    pointBorderWidth: 1,
                                    pointHoverRadius: 5,
                                    pointHoverBackgroundColor: "rgba(32,100,127,1)",
                                    pointHoverBorderColor: "rgba(220,220,220,1)",
                                    pointHoverBorderWidth: 2,
                                    pointRadius: 1,
                                    pointHitRadius: 10,
                                    data: temp.data
                                }
                            ]
                        };
                        var ctx = document.getElementById(name).getContext("2d");
                        var myBarChart = new Chart(ctx, {
                            type: 'line',
                            data: data,
                            options: {
                                xAxes: [{
                                    display: false
                                }]
                            }
                        });

                    });
                }
            });
        }

        $scope.refresh_figure = function (op) {
            $scope.my_select = op;
        };
        create_figure();

    });