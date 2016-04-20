app.controller('newMoodsController', function($scope, datastore, $location) {

	var newLog = {
		mood: 1,
		level: 0,
		trigger: 1,
		behavior: 1,
		belief: 1,
		date: new Date()
	};

	$scope.doc = {
		mood: "",
		level: 0,
		trigger: "",
		behavior: "",
		belief: "",
		date: new Date()
	};

	$scope.previousMoods = datastore.getAll("Mood");
	$scope.previousTriggers = datastore.getAll("Trigger");
	$scope.previousBehaviors = datastore.getAll("Behavior");
	$scope.previousBeliefs = datastore.getAll("Belief");

	$scope.chooseMood = function(mood) {
		$scope.doc.mood = mood.name;
		newLog.mood = mood.id;
	};

	$scope.chooseTrigger = function(trigger) {
		$scope.doc.trigger = trigger.name;
		newLog.trigger = trigger.id;
	};

	$scope.chooseBehavior = function(behavior) {
		$scope.doc.behavior = behavior.name;
		newLog.behavior = behavior.id;
	};

	$scope.chooseBelief = function(belief) {
		$scope.doc.belief = belief.name;
		newLog.belief = belief.id;
	};

	$scope.newMood = function() {
		datastore.upsert("Mood", {name: $scope.doc.mood, type: 1}, "name");
		$scope.previousMoods = datastore.getAll("Mood");
	};

	$scope.newTrigger = function() {
		datastore.upsert("Trigger", {name: $scope.doc.trigger}, "name");
		$scope.previousTriggers = datastore.getAll("Trigger");
	};

	$scope.newBehavior = function() {
		datastore.upsert("Behavior", {name: $scope.doc.behavior}, "name");
		$scope.previousMoods = datastore.getAll("Behavior");
	};

	$scope.newBelief = function() {
		datastore.upsert("Belief", {name: $scope.doc.belief}, "name");
		$scope.previousMoods = datastore.getAll("Belief");
	};

	$scope.addLog = function() {
		newLog.level = $scope.doc.level;
		datastore.upsert("MoodEvent", newLog, "date");
		$location.path("/tab/moods");
	};
});
