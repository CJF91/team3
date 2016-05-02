app.controller('OOBEController', function ($scope, datastore, $state) {
  $scope.start = function() {

		$state.go('tab.splash');
	};
});
