app.controller('helpController', function($scope, $state) {
	$scope.showStrategy = function() {
		$state.go('tab.help.strategy')
	};	
});