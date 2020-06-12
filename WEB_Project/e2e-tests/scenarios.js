'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /Login when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/Login");
  });


  describe('Login', function() {

    beforeEach(function() {
      browser.get('index.html#!/Login');
    });


    it('should render Login when user navigates to /Login', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('headers', function() {

    beforeEach(function() {
      browser.get('index.html#!/headers');
    });


    it('should render headers when user navigates to /headers', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
