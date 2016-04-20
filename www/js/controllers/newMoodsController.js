app.controller('newMoodsController', function($scope, datastore, $location) {
	// TODO: fix this stupid add mood date thing
	$scope.addMood = function(mood) {
		var temp = {
			mood: 1,
			level: 1,
			trigger: 1,
			behavior: 1,
			belief: 1,
			filler: false,
			date: new Date()
		};
		datastore.upsert("MoodEvent", temp, "date");
		$location.path("/tab/moods");
	};
});