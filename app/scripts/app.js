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
        templateUrl: 'views/apis.html',
        controller: 'ApisCtrl'
      })
      .when('/apis/new', {
        templateUrl: 'views/api-new.html',
        controller: 'ApiCreateCtrl'
      })
      .when('/apis/:tag', {
        templateUrl: 'views/api-detail.html',
        controller: 'ApiCtrl'
      })
      .when('/apis/:tag/edit', {
        templateUrl: 'views/api-edit.html',
        controller: 'ApiEditCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
