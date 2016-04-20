app.controller('helpController', function($scope, datastore, $state) {
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

	//Copeing Strategy Container
	datastore.addContainer('Strategy', {
		'moods' : datastore.types.Array,
		'title' : datastore.types.String,
		'content' : datastore.types.String,
		'effect' : datastore.types.Number,
	});

	$scope.effectList =  ['Worse', 'Bit Worse', 'No Better', 'Meh', 'Netural', 'Bit Better', 'Better', 'Lot Better', 'Great', 'Awesome'];

	//Mock Strategies
	if (datastore.getAll('Strategy').length == 0) {
		datastore.save('Strategy', {
			'moods': ['Happy', 'Scared'],
			'title': 'Deep Breathing',
			'content': 'Sometimes breathing deeply and focusing on what\'s important can help you calm down. Try to stop what your doing and focus on your breathing. Breath deeply three or more times to calm down.',
			'effect': 0,
		});

		datastore.save('Strategy', {
			'moods': ['Excited', 'Happy'],
			'title': 'Something Interesting',
			'content': "You might feel like nothing excites you. Like you don't have anything. But I'm sure there is something in this wide world of possibilities that is more interesting than other things. You don't have to be wildly in love – just moderately curious. Start there.",
			'effect': 6,
		});

		datastore.save('Strategy', {
			'moods': ['Angry', 'Tender'],
			'title': 'Take a timeout',
			'content': "Timeouts aren't just for kids. Give yourself short breaks during times of the day that tend to be stressful. A few moments of quiet time might help you feel better prepared to handle what's ahead without getting irritated or angry.",
			'effect': 5,
		});

		datastore.save('Strategy', {
			'moods': ['Sad'],
			'title': 'Smile and Laugh',
			'content': "Smiling and laughing – even faking it – will make you feel happier. I'm not encouraging false laughs here, but if you are feeling low and uninspired, try watching a comedy or just smiling to strangers. This totally works! You might feel goofy, but if that can make you laugh of yourself – even better!",
			'effect': 5,
		});
	}
});
