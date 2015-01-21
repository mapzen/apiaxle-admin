'use strict';

describe('Controller: ApicontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('apiaxleAdminApp'));

  var ApicontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ApicontrollerCtrl = $controller('ApicontrollerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
