app.controller('splashController', function($scope, $ionicHistory, datastore,$rootScope,  $state, $timeout) {
	$scope.latestMood = ["Angry", "5", "trigger", "behavior", "belief", "4/9/2016 9:15am"];

	//TODO: Fix this up and make it actually use the users pin
	//1234 is the dummy pin for now

	// The current code (April 11th) to delete everything from the datastore
	/*
	   	delete window.localStorage.models;
	    delete window.localStorage.Behavior
	    delete window.localStorage.MoodEvent
	    delete window.localStorage.Mood;
	    delete window.localStorage.Trigger
	    delete window.localStorage.Behavior
	    delete window.localStorage.Belief
	    delete window.localStorage.CopingStrategy
	    delete window.localStorage.accessKey
	    delete window.localStorage.Preferences
	 */  
	if (datastore.isEncrypted()) {
		datastore.initalizeAccess("default_password");
		// console.log(datastore.setAccessKey("1234"));
	} else {
		datastore.setAccessKey("default_password");
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

	    datastore.addContainer('CopingStrategies', {
	      'name' : datastore.types.String,
	    });

	    $rootScope.MoodTypeList = ["Happy","Excited","Tender","Scared","Angry","Sad"];

	    // Test Data

	    var happy = datastore.save('Mood', {
	    	'name' : 'Happy',
	    	'type' : 0
	    });
	    var excited = datastore.save('Mood', {
	    	'name' : 'Excited',
	    	'type' : 1
	    });
	    var tender = datastore.save('Mood', {
	    	'name' : 'Tender',
	    	'type' : 2
	    });
	    var scared = datastore.save('Mood', {
	    	'name' : 'Scared',
	    	'type' : 3
	    });
	    var angry = datastore.save('Mood', {
	    	'name' : 'Angry',
	    	'type' : 4
	    });
	    var sad = datastore.save('Mood', {
	    	'name' : 'Sad',
	    	'type' : 5
	    });
	    var excentric = datastore.save('Mood', {
	    	'name' : 'excentric',
	    	'type' : 2
	    });
	    var vampire = datastore.save('Mood', {
	    	'name' : 'vampire',
	    	'type' : 2
	    });	

	    var testMoodArray = [happy,excited,tender,scared,angry,sad,excentric,vampire];

	    var test = datastore.save('Trigger',{
	    	'name' : 'I have a test'
	    });
	    var pain = datastore.save('Trigger',{
	    	'name' : 'I was hurt today'
	    });
	    var fired = datastore.save('Trigger',{
	    	'name' : 'Fired from Job'
	    });

	    var testTriggerArray = [test,pain,fired];

	    var bandAid = datastore.save('Behavior', {
	    	'name' : 'I got over it and put a bandaid on it'
	    });
	    var wimpyBandAid = datastore.save('Behavior', {
	    	'name' : 'I cried in a corner over my minor injury'
	    });
	    var emotionalDamage = datastore.save('Behavior',{
	    	'name' : 'I was emotionally damaged and won\'t be able to live with this problem'
	    });

	    var testBehaviorArray = [bandAid,wimpyBandAid,emotionalDamage];

	    var drunk = datastore.save('Belief',{
	    	'name' : 'I will be drunk :)'
	    });
	    var hurt = datastore.save('Belief',{
	    	'name' : 'That Hurt'
	    });
	    var fail = datastore.save('Belief',{
	    	'name' : 'I will fail my test'
	    });
	    var money = datastore.save('Belief',{
	    	'name' : 'Damn I will be broke'
	    });
	    var america = datastore.save('Belief',{
	    	'name' : "I'll make America great again"
	    });

	    var testBeliefArray = [drunk,hurt,fail,money,america];

	    var adjustableDate = new Date(2000,0,0)
	    for(var i = 0; i < 100;i++){
	    	datastore.save('MoodEvent',{
	    		'mood' :  testMoodArray[Math.floor(Math.random()*(testMoodArray.length))].id,
	    		'level' : Math.floor(Math.random()* 10),
	    		'trigger' : testTriggerArray[Math.floor(Math.random()*(testTriggerArray.length))].id,
	    		'behavior' : testBehaviorArray[Math.floor(Math.random()*(testBehaviorArray.length))].id,
	    		'belief' : testBeliefArray[Math.floor((Math.random()*testBeliefArray.length))].id,
	    		'date' : adjustableDate
	    	});
	    	adjustableDate.setTime(adjustableDate.getTime() + 6*60*60*1000)
	    }	 
	}

	$scope.pinNeeded = true;

	$scope.numbers = [1,2,3,4,5,6,7,8,9];
	$scope.input = [];

    $scope.add = function(n){
    	$scope.input.push(n);

    	if ($scope.input.length == 4) {
    		if (datastore.initalizeAccess("default_password")) {
    			$scope.correct = true;
    		} else {
    			$scope.correct = datastore.initalizeAccess("" + $scope.input[0] + $scope.input[1] + $scope.input[2] + $scope.input[3]);
    		}
    		
    		if ($scope.correct) {
    			$scope.pinNeeded = false;
    		} else {
    			$scope.input = [];
    		}
    	}
    }

    $scope.delete = function(){
    	$scope.input.pop();
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

                if (value) {
                	$('.tab-nav').hide();
                } else {
                	$('.tab-nav').show();
                }
            });

            scope.$on('$destroy', function() {
                $rootScope.hideTabs = false;
                $('.tab-nav').show();
            });
        }
	};
});
