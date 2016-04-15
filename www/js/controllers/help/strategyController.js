app.controller('strategyController', function($scope, $stateParams, $timeout) {
	var feelings = ['Worse', 'Bit Worse', 'No Better', 'Meh', 'Netural', 'Bit Better', 'Better', 'Lot Better', 'Great', 'Awesome'];

	$scope.mood = $stateParams.mood;
	$scope.effectLevel = 'circle1';
	$scope.effectFeeling = feelings[0];

	$scope.changeEffect = function() {
		var level = parseInt($scope.effectLevel.replace("circle", "")) + 1;
		if (level > 10) level = 1;

		$scope.effectFeeling = feelings[level-1];

		$scope.effectLevel = "circle-scale circle" + level;

		$timeout(function() {
			$scope.effectLevel = "circle" + level;
		}, 275);
	};
});
