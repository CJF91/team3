app.controller('splashController', function($scope, $timeout, $state) {

	$scope.pin = [1, 2, 3, 4];

	$scope.numbers = [1,2,3,4,5,6,7,8,9];
	$scope.input = [];

    $scope.add = function(n){
    	$scope.input.push(n);
    	if($scope.input.length == 4){
    		$scope.correct = true;
    		//check input[] against pin of user
    		for(var i = 0; i < 4; i++){
    			if($scope.pin[i] != $scope.input[i]){
    				$scope.correct = false;
    			}
    		}
    		if($scope.correct){
    			$state.go('tab.patterns');
    		}
    		else{
    			$scope.input = [];
    		}
    	}
    	console.log($scope.input);
    }

    $scope.delete = function(){
    	$scope.input.pop();
    	console.log($scope.input);
    }

    

});


app.directive('hideTabs', function($rootScope) {
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            scope.$watch(attributes.hideTabs, function(value){
                $rootScope.hideTabs = value;
            });

            scope.$on('$destroy', function() {
                $rootScope.hideTabs = false;
            });
        }
    };
});