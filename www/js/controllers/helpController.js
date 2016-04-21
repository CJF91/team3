app.controller('helpController', function($scope, datastore, $state, $rootScope) {
	$scope.feelings = {'Happy': 0, 'Excited' : 0, 'Tender': 0, 'Scared': 0, 'Sad': 0, 'Angry': 0};

	//Select a strategy
	$scope.showStrategy = function(mood) {
		var applicable = [];
		var strategies = datastore.getAll('Strategy');

		for (var i = 0; i < strategies.length; i++) {
			if (strategies[i].moods.indexOf(mood) > -1) {
				applicable.push(strategies[i]);
			}
		}

		$state.go('tab.help-strategy', {mood: mood, strategy: applicable[Math.ceil(Math.random() * applicable.length - 1)]});
	};

	//Add containers
	datastore.addContainer('Strategy', {
		'moods' : datastore.types.Array,
		'title' : datastore.types.String,
		'content' : datastore.types.String
	});

	datastore.addContainer('StrategyEvent', {
		'strategy' : datastore.types.Number,
		'effect' : datastore.types.Number,
		'mood': datastore.types.String
	});

	//Update the number of times helped per mood
	for (feeling in $scope.feelings) {
		$scope.feelings[feeling] = datastore.find('StrategyEvent', 'mood', feeling).length;
	}

	//Add a hook to refresh later
	$rootScope.$on('refreshGetHelp', function() {
		for (feeling in $scope.feelings) {
			$scope.feelings[feeling] = datastore.find('StrategyEvent', 'mood', feeling).length;
		}
	});

	$scope.effectList =  ['Worse', 'Bit Worse', 'No Better', 'Meh', 'Netural', 'Bit Better', 'Better', 'Lot Better', 'Great', 'Awesome'];

	//Mock Strategies
	if (datastore.getAll('Strategy').length == 0) {
		datastore.save('Strategy', {
			'moods': ['Happy', 'Scared'],
			'title': 'Deep Breathing',
			'content': 'Sometimes breathing deeply and focusing on what\'s important can help you calm down. Try to stop what your doing and focus on your breathing. Breath deeply three or more times and try to relax.'
		});

		datastore.save('Strategy', {
			'moods': ['Excited', 'Happy'],
			'title': 'Something Interesting',
			'content': "You might feel like nothing excites you. Like you don't have anything. But I'm sure there is something in this wide world of possibilities that is more interesting than other things. You don't have to be wildly in love – just moderately curious. Start there by doing something interesting."
		});

		datastore.save('Strategy', {
			'moods': ['Angry', 'Tender'],
			'title': 'Take a timeout',
			'content': "Timeouts aren't just for kids. Give yourself short breaks during times of the day that tend to be stressful. A few moments of quiet time might help you feel better prepared to handle what's ahead without getting irritated or angry."
		});

		datastore.save('Strategy', {
			'moods': ['Sad'],
			'title': 'Smile and Laugh',
			'content': "Smiling and laughing – even faking it – will make you feel happier. I'm not encouraging false laughs here, but if you are feeling low and uninspired, try watching a comedy or just smiling to strangers. This totally works! You might feel goofy, but if that can make you laugh of yourself – even better!"
		});
	}
});
