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
$scope.labels = [];
$scope.series = [];
$scope.lMood = [];
$scope.lData = [];
$scope.data = [[]];

angular.forEach(moods, function(value, index){
	$scope.dropMoods.push(value.name);
	$scope.series.push(value.name);
});

angular.forEach(trigger, function(value, index){
	$scope.dropTriggers.push(value.name);
});

angular.forEach(beliefs, function(value, index){
	$scope.dropBeliefs.push(value.name);
});

angular.forEach(behavior, function(value, index){
	$scope.dropBehaviors.push(value.name);
});

angular.forEach(AllMoods, function(value, index) {
	if(!$scope.labels.includes(value.date.slice(5,10))) {
		$scope.labels.push(value.date.slice(5,10));
		angular.forEach($scope.moodData, function(value, index) {
			$scope.data[index].push(-1);
		});
	}
});

angular.forEach(AllMoods, function(value, index){
	$scope.currArr = $scope.data[value.mood];
	$scope.index = $scope.labels.indexOf(value.date.slice(5,10));
	if($scope.currArr[$scope.index] == -1 ){
		$scope.currArr[$scope.index] = value.level;
	}
	else{
		$scope.currArr[$scope.index] = ($scope.currArr[$scope.index] + value.level)/2;
	}
});

angular.forEach(AllMoods, function(value, index){
	angular.forEach(value, function(value2, index2){
		if(value2 == -1){
			$scope.moodData[index][index2] = 0;
		}
	});
});

$scope.lMood.push($scope.dropMoods[0]);

$scope.searchMoods = function (mood,belief,behavior,trigger,beforeDate,afterDate) {
	if (!mood && !belief && !behavior && !trigger && !beforeDate && !afterDate){
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

console.log(moods);
console.log(moods[0]);
console.log($scope.searchMoods([1,2], [2],[2],[0]))

console.log(moment(moods[0].date));
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

});
