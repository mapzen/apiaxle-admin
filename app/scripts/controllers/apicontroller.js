'use strict';

/**
 * @ngdoc function
 * @name apiaxleAdminApp.controller:ApicontrollerCtrl
 * @description
 * # ApicontrollerCtrl
 * Controller of the apiaxleAdminApp
 */
angular.module('apiaxleAdminApp')
  .controller('ApisCtrl', ['$scope', 'ApiAxleList', '$location',
    function ($scope, ApiAxleList, $location) {
      var api = ApiAxleList.get({}, function() {
        console.log(api.results);
        $scope.apis = api.results;
      });

      $scope.editApi = function (api) {
        $location.path('/apis/' + api);
      };
  }])
  .controller('ApiCtrl', ['$scope', '$routeParams', 'ApiAxle',
    function($scope, $routeParams, ApiAxle) {
      var api = ApiAxle.get({ id: $routeParams.id}, function() {
	$scope.api = api.results;
	$scope.name = $routeParams.id;
      });
  }]);
