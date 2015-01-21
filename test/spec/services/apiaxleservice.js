'use strict';

describe('Service: apiaxleService', function () {

  // load the service's module
  beforeEach(module('apiaxleAdminApp'));

  // instantiate service
  var apiaxleService;
  beforeEach(inject(function (_apiaxleService_) {
    apiaxleService = _apiaxleService_;
  }));

  it('should do something', function () {
    expect(!!apiaxleService).toBe(true);
  });

});
