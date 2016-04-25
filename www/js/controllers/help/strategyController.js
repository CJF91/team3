app.controller('strategyController', function($scope, $stateParams, $timeout, datastore, $rootScope) {
	var feelings = ['Worse', 'Bit Worse', 'No Better', 'Meh', 'Netural', 'Bit Better', 'Better', 'Lot Better', 'Great', 'Awesome'];
	var record = -1; 

	$scope.mood = $stateParams.mood;
	$scope.effectLevel = 'circle1';
	$scope.effectFeeling = feelings[0];

	$scope.strategy = $stateParams.strategy;
	$scope.percentHelps = 6.4;

	var events = datastore.find('StrategyEvent', 'mood', $stateParams.mood);
	var helped = 0;

	for (var i = 0; i < events.length; i++) {
		if (events[i].effect > 4) {
			helped++;
		}
	}

	$scope.percentHelps = parseInt((helped / events.length) * 100, 10);

	$scope.changeEffect = function() {
		var level = parseInt($scope.effectLevel.replace("circle", "")) + 1;
		if (level > 10) level = 1;

		$scope.effectFeeling = feelings[level-1];

		if (record == -1) {
			var saved = datastore.save('StrategyEvent', {
				strategy: $stateParams.strategy.id,
				effect: level-1,
				mood: $stateParams.mood
			});

			record = saved.id;
		} else {
			datastore.save('StrategyEvent', {
				strategy: $stateParams.strategy.id,
				effect: level-1,
				mood: $stateParams.mood
			}, record);
		}

		$rootScope.$broadcast('refreshGetHelp');

		$scope.effectLevel = "circle-scale circle" + level;

		$timeout(function() {
			$scope.effectLevel = "circle" + level;
		}, 275);
	};
});