'use strict';

/**
 * @ngdoc function
 * @name apiaxleAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the apiaxleAdminApp
 */
angular.module('apiaxleAdminApp')
  .controller('MainCtrl', ['$scope', 'ApiAxleInfo', function ($scope, ApiAxleInfo) {
    var api = ApiAxleInfo.get({}, function() {
      $scope.info = api.results;
      console.log($scope.info);
    });
  }]);
