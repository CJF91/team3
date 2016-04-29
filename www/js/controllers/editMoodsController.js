app.controller('editMoodsController', function($rootScope, $scope, datastore, $location) {
	
	var updateLog = {
		mood: $rootScope.editMood.mood,
		level: $rootScope.editMood.level,
		trigger: $rootScope.editMood.trigger,
		behavior: $rootScope.editMood.behavior,
		belief: $rootScope.editMood.belief,
		date: new Date($rootScope.editMood.date),
	};
	
	$scope.doc = {
		mood: datastore.get("Mood", $rootScope.editMood.mood).name,
		level: $rootScope.editMood.level,
		trigger: datastore.get("Trigger", $rootScope.editMood.trigger).name,
		behavior: datastore.get("Behavior", $rootScope.editMood.behavior).name,
		belief: datastore.get("Belief", $rootScope.editMood.belief).name,
		date: new Date($rootScope.editMood.date),
	};
	
	$scope.previousMoods = datastore.getAll("Mood");
	$scope.previousTriggers = datastore.getAll("Trigger");
	$scope.previousBehaviors = datastore.getAll("Behavior");
	$scope.previousBeliefs = datastore.getAll("Belief");

	$scope.chooseMood = function(mood) {
		$scope.doc.mood = mood.name;
		updateLog.mood = mood.id;
	};

	$scope.chooseTrigger = function(trigger) {
		$scope.doc.trigger = trigger.name;
		updateLog.trigger = trigger.id;
	};

	$scope.chooseBehavior = function(behavior) {
		$scope.doc.behavior = behavior.name;
		updateLog.behavior = behavior.id;
	};

	$scope.chooseBelief = function(belief) {
		$scope.doc.belief = belief.name;
		updateLog.belief = belief.id;
	};

	$scope.update = function() {
		updateLog.level = $scope.doc.level;
		$rootScope.editMood.mood = updateLog.mood;
		$rootScope.editMood.level = updateLog.level;
		$rootScope.editMood.trigger = updateLog.trigger;
		$rootScope.editMood.behavior = updateLog.behavior;
		$rootScope.editMood.belief = updateLog.belief;
		$rootScope.editMood.date = updateLog.date;
		id = $rootScope.editMood.id;
		delete $rootScope.editMood['id'];
		datastore.save("MoodEvent", $rootScope.editMood, id);
		$location.path("/tab/moods");
	};
	
	$scope.cancelUpdate = function() {
		$location.path("/tab/moods");
	}
});
