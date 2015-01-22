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
	      console.log('hello');
	ApiAxle.delete({ id: api }, function() {
          var api = ApiAxleList.get({}, function() {
            $scope.apis = api.results;
          });
	});
      };

      $scope.editApi = function(api) {
        $location.path('/apis/' + api);
      };

      $scope.createNewApi = function() {
        $location.path('/apis/new');
      };
  }])
  .controller('ApiCtrl', ['$scope', '$routeParams', '$location', 'ApiAxle',
    function($scope, $routeParams, $location, ApiAxle) {
      var api = ApiAxle.get({ id: $routeParams.id}, function() {
	$scope.api = api.results;
	$scope.name = $routeParams.id;
      });
      $scope.editApi = function(api) {
	$location.path('/apis/' + api);
        console.log(api);
      };
  }])
  .controller('ApiCreateCtrl', ['$scope', '$routeParams', '$location',  'ApiAxle',
    function($scope, $routeParams, $location, ApiAxle) {
      $scope.createNewApi = function() {
        console.log($scope.api);
        delete $scope.api.id;
        ApiAxle.create($scope.api);
      }
  }]);
