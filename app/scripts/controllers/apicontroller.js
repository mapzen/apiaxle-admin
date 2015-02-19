'use strict';

/**
 * @ngdoc function
 * @name apiaxleAdminApp.controller:ApicontrollerCtrl
 * @description
 * # ApicontrollerCtrl
 * Controller of the apiaxleAdminApp
 */
angular.module('apiaxleAdminApp')
  .controller('ApisCtrl', ['$scope', 'ApiAxleList', 'ApiAxle', '$location',
    function ($scope, ApiAxleList, ApiAxle, $location) {
      var api = ApiAxleList.get({}, function() {
        $scope.apis = api.results;
      });

      $scope.deleteApi = function(api) {
        ApiAxle.delete({ tag: api }, function() {
          var api = ApiAxleList.get({}, function() {
            $scope.apis = api.results;
          });
        });
      };

      $scope.showApi = function(api) {
        $location.path('/apis/' + api);
      }

      $scope.editApi = function(api) {
        $location.path('/apis/' + api + "/edit");
      };

      $scope.createNewApi = function() {
        $location.path('/apis/new');
      };
  }])
  .controller('ApiEditCtrl', ['$scope', '$routeParams', '$location', 'ApiAxle',
    function($scope, $routeParams, $location, ApiAxle) {
      var api = ApiAxle.get({ tag: $routeParams.tag}, function() {
        $scope.api = api.results;
      });
      $scope.name = $routeParams.tag;
      $scope.saveApi = function() {
        ApiAxle.update({tag: $scope.name}, $scope.api, function() {
          $location.path('/apis/' + $routeParams.tag);
        });
      }
  }])
  .controller('ApiCtrl', ['$scope', '$routeParams', '$location', 'ApiAxle', 'ApiAxleMinuteStats', 'ApiAxleHourStats',
    function($scope, $routeParams, $location, ApiAxle, ApiAxleMinuteStats, ApiAxleHourStats) {
      $scope.name = $routeParams.tag;
      var api = ApiAxle.get({ tag: $routeParams.tag}, function() {
        $scope.api = api.results;
      });
      var getDataForGraph = function(rawData, interval) {
          var date = new Date();
          if(interval === "hourly") {
            date.setMinutes(0);
          }
          date.setSeconds(0);
          var timestamp = parseInt(date.getTime() / 1000);

          var axis = []

          var timeRange = 2*60;
          if (interval === "hourly") {
            timeRange = 2*24;
          }
          var stats = {};
          for(var i = timeRange; i--; i > 0) {
            axis.push(timestamp);
            angular.forEach(rawData, function(value, key) {
              angular.forEach(value, function(v,k){
                if(!angular.isArray(stats[k])) {
                  stats[k] = []
                }
                if(v[timestamp]) {
                  stats[k].push(v[timestamp])
                } else {
                  stats[k].push(0)
                }
              });
            });
            if (interval === "hourly") {
              timestamp = timestamp - 60 * 60;
            } else if (interval === "minutely") {
              timestamp = timestamp - 60;
            }
          }
          axis.push('x');
          axis.reverse();
          var displayData = [axis];
          angular.forEach(stats, function(value, k) {
            value.push(k);
            value.reverse();
            displayData.push(value);
          });
        return displayData;
      }
      var generateChartForDiv = function(div, data) {
        var chart = c3.generate({
            bindto: '#' + div,
            data: {
              x: 'x',
              columns: getDataForGraph(data.results, div),
            },
            axis : {
              x : {
                type : 'timeseries',
                tick: {
                  format: function (x) {
                    var date = new Date(x * 1000);
                    var str = "" + date.getMinutes();
                    var pad = "00"
                    var minutes = pad.substring(0, pad.length - str.length) + str
                    return date.getHours() + ":" + minutes;
                  }
                }
              }
            }
        });
      };
      var apiHourStats = ApiAxleHourStats.get({tag: $routeParams.tag},
        function() {
          generateChartForDiv("hourly", apiHourStats);
        }
      );
      var apiMinuteStats = ApiAxleMinuteStats.get({ tag: $routeParams.tag},
        function() {
          generateChartForDiv("minutely", apiMinuteStats);
        }
      );
      $scope.editApi = function(api) {
        $location.path('/apis/' + api + '/edit');
      };
  }])
  .controller('ApiCreateCtrl', ['$scope', '$routeParams', '$location',  'ApiAxle',
    function($scope, $routeParams, $location, ApiAxle) {
      $scope.api = {
        endPointTimeout: 3,
        allowKeylessUse: true,
        keylessQps: 2,
        keylessQpd: 172800
      }
      $scope.saveApi = function() {
        var name = $scope.api.name;
        delete $scope.api.name;
        ApiAxle.create({tag: name}, $scope.api, function() {
          $location.path('/apis/' + name);
        });
      }
  }]);
