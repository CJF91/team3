app.controller('splashController', function($scope, datastore, $rootScope, $state, $timeout) {
	//TODO: Fix this up and make it actually use the users pin
	//1234 is the dummy pin for now

	$scope.latestMood = ["Angry", "5", "trigger", "behavior", "belief", "4/9/2016 9:15am"];

	if (datastore.isEncrypted()) {
		datastore.initalizeAccess("1234");
	} else {
		datastore.setAccessKey("1234");
		 // The General Model for Moods, Beliefs Triggers and Behaviors. Can be changed and is only here for consistentcy.

	    // The user logging the Mood.
	    datastore.addContainer('MoodEvent', {
	      'mood' : datastore.types.Number,
	      'level' : datastore.types.Number,
	      'trigger' : datastore.types.Number,
	      'behavior' : datastore.types.Number,
	      'belief' : datastore.types.Number,
	      'date' : datastore.types.Date,
	    });

	    // The List of Moods (including Custom)
	    datastore.addContainer('Mood', {
	      'name' : datastore.types.String,
	      'type' : datastore.types.Number, // Get From Mood Type List
	    });

	    datastore.addContainer('Trigger', {
	      'name' : datastore.types.String,
	    });

	    datastore.addContainer('Behavior', {
	      'name' : datastore.types.String,
	    });

	    datastore.addContainer('Belief', {
	      'name' : datastore.types.String,
	    });

	    datastore.addContainer('CopingStrategy', {
	      'name' : datastore.types.String,
	    });

	    $rootScope.MoodTypeList = ["Happy","Excited","Tender","Scared","Angry","Sad"];
	}


	$scope.pin = [1, 2, 3, 4];

	$scope.pinNeeded = true;

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
    			// $state.go('tab.moods');
    			$scope.pinNeeded = false;
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


    $scope.go = function(){
    	if(!$scope.pinNeeded){
    		$state.go("tab.moods");
    	}
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
