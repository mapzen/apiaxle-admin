'use strict';

/**
 * @ngdoc overview
 * @name apiaxleAdminApp
 * @description
 * # apiaxleAdminApp
 *
 * Main module of the application.
 */
angular
  .module('apiaxleAdminApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/apis', {
        templateUrl: 'views/apis.html',
        controller: 'ApisCtrl'
      })
      .when('/apis/new', {
        templateUrl: 'views/api-new.html',
        controller: 'ApiCreateCtrl'
      })
      .when('/apis/:endpoint', {
        templateUrl: 'views/api-detail.html',
        controller: 'ApiCtrl'
      })
      .when('/apis/:endpoint/edit', {
        templateUrl: 'views/api-new.html',
        controller: 'ApiEditCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
