app.controller('helpController', function($scope, $state, datastore) {
	$scope.showStrategy = function(mood) {
		datastore.getAll('')
		$state.go('tab.help-strategy', {mood: mood, strategy: 'Do Nothing', directions: 'Literally just sit there'});
	};	
});