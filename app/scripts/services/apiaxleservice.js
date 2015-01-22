'use strict';

/**
 * @ngdoc service
 * @name apiaxleAdminApp.apiaxleService
 * @description
 * # apiaxleService
 * Service in the apiaxleAdminApp.
 */

angular.module('apiaxleAdminApp')
  .factory('ApiAxle', function($resource) {
    return $resource('http://localhost/v1/apis', {}, {
    })
  }).service('apiaxleService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
