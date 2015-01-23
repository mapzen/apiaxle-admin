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
      create: { method: 'POST', headers: {'content-type': 'application/json'} },
      update: { method: 'PUT', headers: {'content-type': 'application/json'} }
    })
  })
  .factory('ApiAxleInfo', function($resource) {
    return $resource('http://localhost/v1/info', {}, {
    })
  })
  .factory('ApiAxleStats', function($resource) {
    return $resource('http://localhost/v1/api/:endpoint/stats', {}, {
    })
  })
  .service('apiaxleService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
