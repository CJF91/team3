app.controller('progressController', function($scope,datastore) {

// Test Data From the chartjs website
var AllMoods = datastore.getAll('MoodEvent');

var moods = datastore.getAll('Mood');
var beliefs = datastore.getAll('Belief');
var behavior = datastore.getAll('Behavior');
var trigger = datastore.getAll('Trigger');

var findRelevantMoods = function (mood,belief,behavior,trigger) {
	if (!mood && !belief && !behavior && !trigger){
		return AllMoods;
	}
	var sorted = JSON.parse((JSON.stringify(AllMoods))); // Deep Copy
	if (mood){
		sorted = sorted.filter(function (elem) {
			return mood.indexOf(elem.mood) != -1;
		})
	}
	if (belief){
		sorted = sorted.filter(function (elem) {
			return belief.indexOf(elem.belief) != -1;
		})
	}
	if (behavior){
		sorted = sorted.filter(function (elem) {
			return behavior.indexOf(elem.behavior) != -1;
		})
	}
	if (trigger){
		sorted = sorted.filter(function (elem) {
			return trigger.indexOf(elem.trigger) != -1;
		})
	}


	return sorted;

}
console.log(moods);
console.log(moods[0]);
console.log(findRelevantMoods([1,2], [2],[2],[0]))



  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

});