app.controller('patternsController', function($scope) {

	  $scope.moods = ['Angry', 'Happy','Tired', 'Sad', 'Upset', 'Drumpf', 'Thirsty'];

	  $scope.series = [];

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

	  $scope.data = [];

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
	  			document.getElementById("myDropdown1").classList.toggle("show");
    			$scope.open1 = !$scope.open1;
    			if($scope.open1 == true){
    				if($scope.open2 == true){
    					document.getElementById("myDropdown2").classList.toggle("show");
    					$scope.open2 = false;
    				}
    				if($scope.open3 == true){
    					document.getElementById("myDropdown3").classList.toggle("show");
    					$scope.open3 = false;
    				}
    			}
	  			break;
	  		case '2':
	  			document.getElementById("myDropdown2").classList.toggle("show");
    			$scope.open2 = !$scope.open2;
    			if($scope.open2 == true){
    				if($scope.open1 == true){
    					document.getElementById("myDropdown1").classList.toggle("show");
    					$scope.open1 = false;
    				}
    				if($scope.open3 == true){
    					document.getElementById("myDropdown3").classList.toggle("show");
    					$scope.open3 = false;
    				}
    			}
	  			break;
	  		case '3':
	  			document.getElementById("myDropdown3").classList.toggle("show");
    			$scope.open3 = !$scope.open3;
    			if($scope.open3 == true){
    				if($scope.open1 == true){
    					document.getElementById("myDropdown1").classList.toggle("show");
    					$scope.open1 = false;
    				}
    				if($scope.open2 == true){
    					document.getElementById("myDropdown2").classList.toggle("show");
    					$scope.open2 = false;
    				}
    			}
	  			break;
	  		default:
	  			break;
	  	}
	  }

	  $scope.open1 = false;
	  $scope.open2 = false;
	  $scope.open3 = false;

	  $scope.lineGraph = false;
	  $scope.radiusGraph = false;

	  $scope.changeGraph = function(factor) {
	  	switch(factor){
	  		case 'line': //line graph selected
	  			$scope.lineGraph = true;
	  			$scope.radiusGraph = false;
	  			$scope.drop('1');
	  			break;
	  		case 'rad': //radius graph selected
	  			$scope.radiusGraph = true;
	  			$scope.lineGraph = false;
	  			$scope.drop('1');
	  			break;
	  		case '20': //first item in 2nd dropdown
	  			$scope.changeDays(3);
	  			$scope.drop('2');
	  			break;
	  		case '21': //second item in 2nd dropdown
	  			$scope.changeDays(5);
	  			$scope.drop('2');
	  			break;
	  		case '22': //third item in 2nd dropdown
	  			$scope.changeDays(7);
	  			$scope.drop('2');
	  			break;
	  		default:
	  			break;
	  	}

	  }

	  $scope.addMood =  function(mood){
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
	  }

	  $scope.changeDays = function(pastDays){
	  	$scope.labels.splice(0, $scope.labels.length - pastDays);
	  	console.log($scope.labels);
	  }


});