app.controller('helpfulstrategyController', function($scope, $state) {
  $scope.showStrategy = function(mood) {
		$state.go('tab.help-strategy', {mood: mood});
	};
});
