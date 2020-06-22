'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngAnimate',
  'ngMaterial',
  'ngMessages',
  'ui.router',
  'Login',
  'Register',
  'Shopping',
  'Headers',
])
    .controller('myAppCtrl',function ($scope, $state) {
      $state.go('Shopping');
    });
