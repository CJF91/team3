app.controller('patternsController', function($scope) {

	  $scope.moods = ['Angry', 'Happy','Tired', 'Sad', 'Upset', 'Drumpf', 'Thirsty'];

	  $scope.series = ['Angry', 'Happy','Tired', 'Sad', 'Upset', 'Drumpf', 'Thirsty'];

	  //assuming today is Saturday
	  $scope.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	  $scope.labels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	  $scope.moodData = [ //each array represents a mood, the average score for that mood for that day
	    [0, 7, 6, 10, 0, 0, 2],
	    [5, 0, 0, 0, 5, 6, 0],
	    [9, 0, 0, 0, 5, 3, 2],
	    [3, 6, 4, 2, 8, 7, 3],
	    [6, 3, 2, 4, 7, 8, 3],
	    [4, 2, 1, 6, 4, 3, 3],
	    [1, 0, 4, 2, 6, 1, 3]
	  ];

	  $scope.data = [
	  	[0, 7, 6, 10, 0, 0, 2],
	    [5, 0, 0, 0, 5, 6, 0],
	    [9, 0, 0, 0, 5, 3, 2],
	    [3, 6, 4, 2, 8, 7, 3],
	    [6, 3, 2, 4, 7, 8, 3],
	    [4, 2, 1, 6, 4, 3, 3],
	    [1, 0, 4, 2, 6, 1, 3]
	  ];

	  $scope.pieData = [];

	  $scope.select = {
	  	which: 'e'
	  };

	  $scope.makePieData = function(i){ 
	  	switch(i){ //if  based on number of entries
	  		case('e'):
			  	$scope.pieData = [];
			  	angular.forEach($scope.data, function(value, index){
			  		$scope.entries = 0;
			  		$scope.valid = (value.length - 1) - ($scope.labels.length - 1);
			  		angular.forEach(value, function(value2, index2){
			  			if(value2 > 0 && index2 >= $scope.valid){ //if greater than 0 and is within the days that are selected, count as an entry
			  				$scope.entries += 1;
			  			}
			  		});
			  		$scope.pieData.push($scope.entries);	
			  	});
				break;
			case('i'): //if based on intensities of entries
				$scope.pieData = [];
			  	angular.forEach($scope.data, function(value, index){
			  		$scope.entries = 0;
			  		$scope.valid = (value.length - 1) - ($scope.labels.length - 1);
			  		$scope.total = 0;
			  		angular.forEach(value, function(value2, index2){
			  			if(index2 >= $scope.valid){ //if greater than 0 and is within the days that are selected, count as an entry
			  				$scope.entries += value2;
			  			}
			  			$scope.total++;
			  		});
			  		$scope.pieData.push($scope.entries/$scope.total);	
			  	});
			  	break;
			default:
				break;
		}
	  }

	  $scope.makePieData('e');

	  $scope.barSeries = ["Avg Intensity"];
	  $scope.barData = [[]];

	   $scope.makeBarData = function(){
	  	$scope.barData = [[]];
	  	 angular.forEach($scope.data, function(value, index){
	  	 	$scope.sum = 0;
	  	 	$scope.currArr = $scope.barData[0];
	  	 	$scope.valid = (value.length - 1) - ($scope.labels.length - 1);
	  	 	$scope.tot = 0;
	  		angular.forEach(value, function(value2, index2){
	  			if(index2 >= $scope.valid){
	  				$scope.tot++;
	  				$scope.sum = $scope.sum + value2;
	  			}
	  		});	
	  		$scope.sum = $scope.sum/$scope.tot;
	  		$scope.currArr.push($scope.sum);
	  	});
	  }

	  $scope.makeBarData();

	  //  for(i = 0; i < $scope.moods.length; i++){
	  // 	if( ((Math.floor(Math.random() * 2))) == 1 ){
	  // 		$scope.series.push($scope.moods[i]);
	  // 		$scope.data.push($scope.moodData[i]);
	  // 	} 
	  // }

	  $scope.moodData2 = [ //data reorganized to fit the radius chart, each array has the moods that are filled for the day
	  //for example, angry would be [5, 3, 9, 1]
	   [5, 3, 1, 1, 4, 5, 6],
	   [3, 7, 1, 0, 4, 3, 1],
	   [9, 0, 0, 0, 5, 7, 3],
	   [1, 8, 10, 0, 3, 1, 3],
	   [5, 3, 1, 10, 9, 4, 2],
	   [1, 3, 0, 0, 5, 3, 2],
	   [3, 7, 5, 3, 1, 4, 6]
	  ];

	  $scope.data2 = [];


	  $scope.onClick = function (points, evt) {
	    console.log(points, evt);
	  };

	  $scope.drop = function(i) {
	  	switch(i){
	  		case '1':
	  			document.getElementById("dropdown1").classList.toggle("show");
    			$scope.open1 = !$scope.open1;
    			if($scope.open1 == true){
    				if($scope.open2 == true){
    					document.getElementById("dropdown2").classList.toggle("show");
    					$scope.open2 = false;
    				}
    				if($scope.open3 == true){
    					document.getElementById("dropdown3").classList.toggle("show");
    					$scope.open3 = false;
    				}
    			}
	  			break;
	  		case '2':
	  			document.getElementById("dropdown2").classList.toggle("show");
    			$scope.open2 = !$scope.open2;
    			if($scope.open2 == true){
    				if($scope.open1 == true){
    					document.getElementById("dropdown1").classList.toggle("show");
    					$scope.open1 = false;
    				}
    				if($scope.open3 == true){
    					document.getElementById("dropdown3").classList.toggle("show");
    					$scope.open3 = false;
    				}
    			}
	  			break;
	  		case '3':
	  			document.getElementById("dropdown3").classList.toggle("show");
    			$scope.open3 = !$scope.open3;
    			if($scope.open3 == true){
    				if($scope.open1 == true){
    					document.getElementById("dropdown1").classList.toggle("show");
    					$scope.open1 = false;
    				}
    				if($scope.open2 == true){
    					document.getElementById("dropdown2").classList.toggle("show");
    					$scope.open2 = false;
    				}
    			}
	  			break;
	  		default:
	  			if($scope.open1 == true){
    					document.getElementById("dropdown1").classList.toggle("show");
    					$scope.open1 = false;
    			}
    			if($scope.open2 == true){
    					document.getElementById("dropdown2").classList.toggle("show");
    					$scope.open2 = false;
    			}
    			if($scope.open3 == true){
    				document.getElementById("dropdown3").classList.toggle("show");
    				$scope.open3 = false;
    			}

	  			break;
	  	}
	  }

	  $scope.open1 = false;
	  $scope.open2 = false;
	  $scope.open3 = false;

	  $scope.lineGraph = true; //line graph is defaultly shown 
	  $scope.radiusGraph = false;
	  $scope.barGraph = false;
	  $scope.pieChart = false

	  $scope.changeGraph = function(factor) {
	  	switch(factor){
	  		case 'line': //line graph selected
	  			$scope.lineGraph = true;
	  			$scope.radiusGraph = false;
	  			$scope.barGraph = false;
	  			$scope.pieChart = false;
	  			$scope.drop('1');
	  			break;
	  		case 'rad': //radius graph selected
	  			$scope.radiusGraph = true;
	  			$scope.lineGraph = false;
	  			$scope.barGraph = false;
	  			$scope.pieChart = false;
	  			$scope.drop('1');
	  			break;
	  		case 'bar': //bar graph selected
	  			$scope.barGraph = true;
	  			$scope.radiusGraph = false;
	  			$scope.lineGraph = false;
	  			$scope.pieChart = false;
	  			$scope.drop('1');
	  			$scope.makeBarData();
	  			break;
	  		case 'pie': //pie chart selected
	  			$scope.pieChart = true;
	  			$scope.barGraph = false;
	  			$scope.radiusGraph = false;
	  			$scope.lineGraph = false;
	  			$scope.drop('1');
	  			break;
	  		default:
	  			break;
	  	}

	  }

	  $scope.firstTime = true; //boolean for whether the user has specified a mood for the graph yet

	  $scope.addMood =  function(mood){
	  	if($scope.firstTime){
	  		$scope.data = [];
	  		$scope.series = [];
	  		$scope.firstTime = false;
	  	}

	  	if($scope.series.indexOf(mood) == -1){
	  		$scope.series.push(mood);
	  		$scope.position = $scope.moods.indexOf(mood);
	  		// start line graph modifications
	  		$scope.data.push($scope.moodData[$scope.position]);
	  		// end line graph modifications
	  	}
	  	else{
	  		$scope.position = $scope.series.indexOf(mood);
	  		$scope.series.splice($scope.position, 1);
	  		$scope.data.splice($scope.position, 1);
	  	}

	  	if($scope.barGraph){
	  		$scope.makeBarData();
	  	}
	  	else if($scope.pieChart){
	  		$scope.makePieData();
	  	}
	  }

	  $scope.numDays = {
	  		num: 7
	  };

	  $scope.changeDays = function(){
	  	angular.copy($scope.days, $scope.labels);
	  	// $scope.labels.splice(0, $scope.labels.length - pastDays);
	  	$scope.labels.splice(0, $scope.labels.length - $scope.numDays.num);
	  	// $scope.numDays = pastDays;
	  	if($scope.barGraph){
	  		$scope.makeBarData();
	  	}
	  	else if($scope.pieChart){
	  		$scope.makePieData();
	  	}
	  }

});