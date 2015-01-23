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
  .controller('ApiCtrl', ['$scope', '$routeParams', '$location', 'ApiAxle', 'ApiAxleStats',
    function($scope, $routeParams, $location, ApiAxle, ApiAxleStats) {
      $scope.name = $routeParams.tag;
      var api = ApiAxle.get({ tag: $routeParams.tag}, function() {
	$scope.api = api.results;
      });
      var apiStats = ApiAxleStats.get({ endpoint: $routeParams.endpoint}, function() {
        $scope.stats = apiStats.results;
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
