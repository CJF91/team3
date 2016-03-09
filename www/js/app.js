// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.moods', {
    url: '/moods',
    views: {
      'tab-moods': {
        templateUrl: 'templates/tab-moods.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.patterns', {
    url: '/patterns',
    views: {
      'tab-patterns': {
        templateUrl: 'templates/tab-patterns.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.help', {
    url: '/patterns',
    views: {
      'tab-help': {
        templateUrl: 'templates/tab-help.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.progress', {
    url: '/progress',
    views: {
      'tab-progress': {
        templateUrl: 'templates/tab-progress.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.preferences', {
    url: '/preferences',
    views: {
      'tab-preferences': {
        templateUrl: 'templates/tab-preferences.html',
        controller: 'DashCtrl'
      }
    }
  })
  

  $urlRouterProvider.otherwise('/tab/dash');
});
