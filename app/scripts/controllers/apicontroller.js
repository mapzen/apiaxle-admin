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
        console.log(api.results);
        $scope.apis = api.results;
      });

      $scope.deleteApi = function(api) {
	ApiAxle.delete({ endpoint: api }, function() {
          var api = ApiAxleList.get({}, function() {
            $scope.apis = api.results;
          });
	});
      };

      $scope.editApi = function(api) {
        $location.path('/apis/' + api + "/edit");
      };

      $scope.createNewApi = function() {
        $location.path('/apis/new');
      };
  }])
  .controller('ApiEditCtrl', ['$scope', '$routeParams', '$location', 'ApiAxle',
    function($scope, $routeParams, $location, ApiAxle) {
      var api = ApiAxle.get({ endpoint: $routeParams.endpoint}, function() {
	$scope.api = api.results;
      });
      $scope.saveApi = function() {
        ApiAxle.update($scope.api);
	$location.path('/apis/' + $scope.api.endPoint);
      }
  }])
  .controller('ApiCtrl', ['$scope', '$routeParams', '$location', 'ApiAxle', 'ApiAxleStats',
    function($scope, $routeParams, $location, ApiAxle, ApiAxleStats) {
      var api = ApiAxle.get({ endpoint: $routeParams.endpoint}, function() {
	$scope.api = api.results;
      });
      var apiStats = ApiAxleStats.get({ endpoint: $routeParams.endpoint}, function() {
        $scope.stats = apiStats.results;
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
        ApiAxle.create($scope.api);
      }
  }]);
