app.controller('patternsController', function($scope) {
	  $scope.labels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	  $scope.series = ['Series A', 'Series B'];
	  $scope.data = [
	    [(4, 3), 7, 6]
	  ];

	  $scope.onClick = function (points, evt) {
	    console.log(points, evt);
	  };

});