// Test Data From the chartjs website
app.controller('progressController', function($scope,datastore) {

var AllMoods = datastore.getAll('MoodEvent');
var moods = datastore.getAll('Mood');
var beliefs = datastore.getAll('Belief');
var behavior = datastore.getAll('Behavior');
var trigger = datastore.getAll('Trigger');

$scope.o1 = false;
$scope.o2 = false;
$scope.o3 = false;
$scope.o4 = false;
$scope.dropMoods = [];
$scope.dropTriggers = [];
$scope.dropBeliefs = [];
$scope.dropBehaviors = [];

var checkedMoods = [];
var checkedBeliefs = [];
var checkedBehaviors = [];
var checkedTriggers = [];


angular.forEach(moods, function(value, index){
	$scope.dropMoods.push(value);
});

angular.forEach(trigger, function(value, index){
	$scope.dropTriggers.push(value);
});

angular.forEach(beliefs, function(value, index){
	$scope.dropBeliefs.push(value);
});

angular.forEach(behavior, function(value, index){
	$scope.dropBehaviors.push(value);
});

$scope.searchMoods = function (mood,belief,behavior,trigger,beforeDate,afterDate) {
	if (!mood && !belief && !behavior && !trigger && !beforeDate && !afterDate){
		return AllMoods;
	}
	var sorted = JSON.parse((JSON.stringify(AllMoods))); // Deep Copy
	if (typeof mood != "undefined" && mood != null && mood.length > 0){
		sorted = sorted.filter(function (elem) {
			return mood.indexOf(elem.mood) != -1;
		})
	}
	if (typeof belief != "undefined" && belief != null && belief.length > 0){
		sorted = sorted.filter(function (elem) {
			return belief.indexOf(elem.belief) != -1;
		})
	}
	if (typeof behavior != "undefined" && behavior != null && behavior.length > 0){
		sorted = sorted.filter(function (elem) {
			return behavior.indexOf(elem.behavior) != -1;
		})
	}
	if (typeof trigger != "undefined" && trigger != null && trigger.length > 0){
		sorted = sorted.filter(function (elem) {
			return trigger.indexOf(elem.trigger) != -1;
		})
	}
	if(beforeDate && afterDate){
		sorted = sorted.filter(function (elem) {
			return moment(elem.date).isBetween(beforeDate,afterDate, null, '[]');
		})
	} else if (beforeDate) {
		sorted = sorted.filter(function (elem) {
			return moment(elem.date).isSameOrBefore(beforeDate);
		})
	} else if (afterDate){
		sorted = sorted.filter(function (elem) {
			return moment(elem.date).isSameOrAfter(afterDate);
		})
	}
	console.log(sorted)
	return sorted;

}

$scope.drp = function(i) {
	switch(i){
		case '1':
			document.getElementById("drp1").classList.toggle("show");
			$scope.o1 = !$scope.o1;
			if($scope.o1 == true){
				if($scope.o2 == true){
					document.getElementById("drp2").classList.toggle("show");
					$scope.o2 = false;
				}
				if($scope.o3 == true){
					document.getElementById("drp3").classList.toggle("show");
					$scope.o3 = false;
				}
				if($scope.o4 == true){
					document.getElementById("drp2").classList.toggle("show");
					$scope.o4 = false;
				}
			}
			break;
		case '2':
			document.getElementById("drp2").classList.toggle("show");
			$scope.o2 = !$scope.o2;
			if($scope.o2 == true){
				if($scope.o1 == true){
					document.getElementById("drp1").classList.toggle("show");
					$scope.o1 = false;
				}
				if($scope.o3 == true){
					document.getElementById("drp3").classList.toggle("show");
					$scope.o3 = false;
				}
				if($scope.o4 == true){
					document.getElementById("drp2").classList.toggle("show");
					$scope.o4 = false;
				}
			}
			break;
		case '3':
			document.getElementById("drp3").classList.toggle("show");
			$scope.o3 = !$scope.o3;
			if($scope.o3 == true){
				if($scope.o1 == true){
					document.getElementById("drp1").classList.toggle("show");
					$scope.o1 = false;
				}
				if($scope.o2 == true){
					document.getElementById("drp2").classList.toggle("show");
					$scope.o2 = false;
				}
				if($scope.o4 == true){
					document.getElementById("drp2").classList.toggle("show");
					$scope.o4 = false;
				}
			}
			break;
			case '4':
				document.getElementById("drp4").classList.toggle("show");
				$scope.o4 = !$scope.o4;
				if($scope.o4 == true){
					if($scope.o1 == true){
						document.getElementById("drp1").classList.toggle("show");
						$scope.o1 = false;
					}
					if($scope.o2 == true){
						document.getElementById("drp2").classList.toggle("show");
						$scope.o2 = false;
					}
					if($scope.o3 == true){
						document.getElementById("drp3").classList.toggle("show");
						$scope.o3 = false;
					}
				}
				break;
		default:
			if($scope.o1 == true){
					document.getElementById("drp1").classList.toggle("show");
					$scope.o1 = false;
			}
			if($scope.o2 == true){
					document.getElementById("drp2").classList.toggle("show");
					$scope.o2 = false;
			}
			if($scope.o3 == true){
				document.getElementById("drp3").classList.toggle("show");
				$scope.o3 = false;
			}
			if($scope.o4 == true){
					document.getElementById("drp4").classList.toggle("show");
					$scope.o4 = false;
			}
			break;
	}
}
$scope.refreshGraph = function () {
	var data = [];
	var mood = JSON.parse((JSON.stringify(checkedMoods)));
	console.log(checkedMoods.length);
	if(checkedMoods.length == 0){
		console.log("I happend");
		moods.forEach(function (currentVal){
			mood.push(currentVal.id)
		})
	}
	console.log(moods);
	console.log(mood);
	mood.forEach(function (currentVal) {
		var curMood = $scope.searchMoods([currentVal],checkedBeliefs,checkedBehaviors,checkedTriggers);
		console.log([currentVal])
		var curData = [];
		curMood.forEach(function(currentVal){
			curData.push(currentVal.level);
		})
		data.push(curData);
	})
	$scope.data = data;
	$scope.$apply();
}

$scope.addMoods = function(mood){
	if(mood.val){
		checkedMoods.push(mood.id);
		console.log(checkedMoods);
	}else{
		var index = checkedMoods.indexOf(mood.id);
		checkedMoods.splice(index,1);
	}
	$scope.refreshGraph();
}
$scope.addTrigger = function(trigger){
	if(trigger.val){
		checkedTriggers.push(trigger.id);
	}else{
		var index = checkedTriggers.indexOf(trigger.id);
		checkedTriggers.splice(index,1);
	}
	$scope.refreshGraph();
}
$scope.addBehavior = function(behavior){
	if(behavior.val){
		checkedBehaviors.push(behavior.id);
	}else{
		var index = checkedBehaviors.indexOf(behavior.id);
		checkedBehaviors.splice(index,1);
	}
	$scope.refreshGraph();
}
$scope.addBelief = function(beliefs){
	if(beliefs.val){
		checkedBeliefs.push(beliefs.id);
	}else{
		var index = checkedBeliefs.indexOf(beliefs.id);
		checkedBeliefs.splice(index,1);
	}
	$scope.refreshGraph();
}
console.log(moods);
console.log(moods[0]);
console.log($scope.searchMoods([1,2],[],[],[]))

console.log(moment(moods[0].date));
console.log($scope.refreshGraph());
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

});