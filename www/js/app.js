var app = angular.module('app', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
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
        controller: 'moodsController'
      }
    }
  })

  .state('tab.patterns', {
    url: '/patterns',
    views: {
      'tab-patterns': {
        templateUrl: 'templates/tab-patterns.html',
        controller: 'patternsController'
      }
    }
  })

  .state('tab.help', {
    url: '/help',
    views: {
      'tab-help': {
        templateUrl: 'templates/tab-help.html',
        controller: 'helpController'
      }
    }
  })

  .state('tab.progress', {
    url: '/progress',
    views: {
      'tab-progress': {
        templateUrl: 'templates/tab-progress.html',
        controller: 'progressController'
      }
    }
  })

  .state('tab.preferences', {
    url: '/preferences',
    views: {
      'tab-preferences': {
        templateUrl: 'templates/tab-preferences.html',
        controller: 'preferencesController'
      }
    }
  })

  .state('tab.splash', {
    url: '/splash',
    views: {
      'tab-splash': {
        templateUrl : 'templates/splash.html',
        controller: 'splashController'
      }
    }
  })

  $urlRouterProvider.otherwise('/tab/splash');
})

.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
});
