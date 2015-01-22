'use strict';

/**
 * @ngdoc function
 * @name apiaxleAdminApp.controller:ApicontrollerCtrl
 * @description
 * # ApicontrollerCtrl
 * Controller of the apiaxleAdminApp
 */
angular.module('apiaxleAdminApp')
  .controller('ApicontrollerCtrl', ['$scope', 'ApiAxle', function ($scope, ApiAxle) {
    var api = ApiAxle.get({}, function() {
      console.log(api.results);
      $scope.apis = api.results;
    });
  }]);
