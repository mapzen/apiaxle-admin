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
      var apiHourStats = ApiAxleHourStats.get({tag: $routeParams.tag},
        function() {
          console.log(apiHourStats);
          var date = new Date();
          date.setMinutes(0);
          date.setSeconds(0);
          var timestamp = parseInt(date.getTime() / 1000);

          var axis = []
          var stats = { 200: [], 304: [] };
          for(var i = 2 * 24; i--; i > 0) {
            axis.push(timestamp);
            var number200 = apiHourStats.results.uncached['200'][timestamp];
            var number304 = apiHourStats.results.uncached['304'][timestamp];
            if(number200) {
              stats['200'].push(number200);
            } else {
              stats['200'].push(0);
            }
            if(number304) {
              stats['304'].push(number304);
            } else {
              stats['304'].push(0);
            }
            timestamp = timestamp - 60 * 60;
          }
          axis.push('x');
          axis.reverse();
          stats['200'].push("200");
          stats['200'].reverse()
          stats['304'].push("304");
          stats['304'].reverse()

          var chart = c3.generate({
              bindto: '#chart_days',
              data: {
                x: 'x',
                columns: [
                  axis,
                  stats['200'],
                  stats['304']
                ],
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
        }
      );
      var apiMinuteStats = ApiAxleMinuteStats.get({ tag: $routeParams.tag},
        function() {
          var date = new Date();
          date.setSeconds(0);
          var timestamp = parseInt(date.getTime() / 1000);

          $scope.axis = []
          $scope.stats = { 200: [], 304: [] };
          for(var i = 2 * 60; i--; i > 0) {
            $scope.axis.push(timestamp);
            var number200 = apiMinuteStats.results.uncached['200'][timestamp];
            var number304 = apiMinuteStats.results.uncached['304'][timestamp];
            if(number200) {
              $scope.stats['200'].push(number200);
            } else {
              $scope.stats['200'].push(0);
            }
            if(number304) {
              $scope.stats['304'].push(number304);
            } else {
              $scope.stats['304'].push(0);
            }
            timestamp = timestamp - 60;
          }
          $scope.axis.push('x');
          $scope.axis.reverse();
          $scope.stats['200'].push("200");
          $scope.stats['200'].reverse()
          $scope.stats['304'].push("304");
          $scope.stats['304'].reverse()

          var chart = c3.generate({
              bindto: '#chart_minutes',
              data: {
                x: 'x',
                columns: [
                  $scope.axis,
                  $scope.stats['200'],
                  $scope.stats['304']
                ]
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
      });
      $scope.$watch('hello', function (value) {
        console.log($scope.stats);
      });

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
