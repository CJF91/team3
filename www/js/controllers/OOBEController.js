app.controller('OOBEController', function ($scope, datastore, $state) {
  
  $scope.start = function(name,key) {

		$state.go('tab.splash');
	};
});
