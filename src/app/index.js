'use strict';

angular.module('friendlyView', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'ui.bootstrap', 'nvd3'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
  .config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('https://friendly-chart.herokuapp.com');
  })
;
