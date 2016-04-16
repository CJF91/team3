app.controller('helpController', function($scope, $state) {
	$scope.showStrategy = function(mood) {
		$state.go('tab.help-strategy', {mood: mood});
	};

	//mock data container
	datastore.addContainer('Strategy', {
		'mood' : datastore.types.String,
		'title' : datastore.types.String,
		'content' : datastore.types.String,
		'effect' : datastore.types.Number,
	});

	//effectList
	$Scope.effectList =  ['Worse', 'Bit Worse', 'No Better', 'Meh', 'Netural', 'Bit Better', 'Better', 'Lot Better', 'Great', 'Awesome'];

	//mock data
	datastore.save('strategy', {
		'mood': 'Happy',
		'title': 'Deep Breathing',
		'content': 'I guess you can like breath and stuff. If your weird and have a problem with being happy that is. Which I have no idea why that would be. But I guess we have to help you with your happiness problems. First world problems am I right. Like literally your too happy, damn, I wish I had your problems',
		'effect': 0,
	}, 1);

	datastore.save('strategy', {
		'mood': 'Excited',
		'title': 'Do what interests you the most',
		'content': "You might feel like nothing excites you. Like you don't have anything. But I'm sure there is something in this wide world of possibilities that is more interesting than other things. You don't have to be wildly in love – just moderately curious. Start there.",
		'effect': 6,
	}, 2);

	datastore.save('strategy', {
		'mood': 'Angry',
		'title': 'Take a timeout',
		'content': "Timeouts aren't just for kids. Give yourself short breaks during times of the day that tend to be stressful. A few moments of quiet time might help you feel better prepared to handle what's ahead without getting irritated or angry.",
		'effect': 5,
	}, 3);

	datastore.save('strategy', {
		'mood': 'Sad',
		'title': 'Smile and laugh more',
		'content': "Smiling and lauging – even faking it – will make you feel happier. I'm not encouraging false laughs here, but if you are feeling low and uninspired, try watching a comedy or just smiling to strangers. This totally works! You might feel goofy, but if that can make you laugh of yourself – even better!",
		'effect': 5,
	}, 4);

});
