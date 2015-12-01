'use strict';

angular.module('core').controller('HomeController', ['$scope','$http', 'Authentication',
    function ($scope,$http, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $http.get('/api/chart/invMonth?year='+(new Date()).getFullYear()).success(function (res) {
            $scope.chartData = [];
            $scope.chartCategory = [];
            for(var i in res){
                $scope.chartData.push(res[i].total);
                $scope.chartCategory.push(res[i]._id.month+'-сар');
            }
            $scope.buildChart($scope.chartData,$scope.chartCategory);
        });

        $scope.getYear = function () {
            $http.get('/api/chart/invMonth?year='+$scope.filter.year).success(function (res) {
                $scope.chartData = [];
                $scope.chartCategory = [];
                for(var i in res){
                    $scope.chartData.push(res[i].total);
                    $scope.chartCategory.push(res[i]._id.month+'-сар');
                }
                $scope.buildChart($scope.chartData,$scope.chartCategory);
            });
        }
        $scope.buildChart = function (data,category) {
            $scope.chart = {
                options: {
                    chart: {
                        type: 'line'
                    }
                },
                xAxis: {
                    categories: category
                },
                yAxis: {
                    title: {
                        text: 'Төгрөгөөр'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    shared: true,
                    crosshairs: true
                },
                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function() {
                                    alert ('Category: '+ this.category +', value: '+ this.y);
                                }
                            }
                        }
                    }
                },
                series: [{
                    name: 'Орлого',
                    data: data
                }],
                title: {
                    text: 'Борлуулалтын орлого сараар'
                }
            }
        }

    }
]);
