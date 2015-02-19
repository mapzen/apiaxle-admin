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
    return $resource('/v1/apis', {}, {
    })
  })
  .factory('ApiAxle', function($resource) {
    return $resource('/v1/api/:tag', {tag: '@tag'}, {
      create: { method: 'POST', headers: {'content-type': 'application/json'} },
      update: { method: 'PUT', headers: {'content-type': 'application/json'} }
    })
  })
  .factory('ApiAxleInfo', function($resource) {
    return $resource('/v1/info', {}, {
    })
  })
  .factory('ApiAxleMinuteStats', function($resource) {
    var date = new Date();
    date.setDate(date.getDate() - 1);
    var timestamp = parseInt(date.getTime()/1000, 10);

    return $resource('/v1/api/:tag/stats', {
        from: timestamp,
        granularity: 'minute',
        format_timeseries: 'true'
      }, {})
  })
  .factory('ApiAxleHourStats', function($resource) {
    var date = new Date();
    date.setDate(date.getDate() - 2);
    var timestamp = parseInt(date.getTime()/1000, 10);

    return $resource('/v1/api/:tag/stats', {
        from: timestamp,
        granularity: 'hour',
        format_timeseries: 'true'
      }, {})
  })
  .service('apiaxleService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
