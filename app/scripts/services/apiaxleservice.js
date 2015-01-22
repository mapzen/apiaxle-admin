'use strict';

/**
 * @ngdoc service
 * @name apiaxleAdminApp.apiaxleService
 * @description
 * # apiaxleService
 * Service in the apiaxleAdminApp.
 */

angular.module('apiaxleAdminApp')
  .factory('ApiAxleList', function($resource) {
    return $resource('http://localhost/v1/apis', {}, {
    })
  })
  .factory('ApiAxle', function($resource) {
    return $resource('http://localhost/v1/api/:endpoint', {endpoint: '@endPoint'}, {
      create: { method: 'POST', headers: {'content-type': 'application/json'} }
    })
  })
  .service('apiaxleService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
