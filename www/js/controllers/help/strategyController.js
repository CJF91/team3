app.controller('strategyController', function($scope, $stateParams) {
	$scope.mood = $stateParams.mood;

	if($scope.mood ==='Happy')
	$scope.strategys = [
		{
			str:'1. Be positive.',
			rate: '5/5'
		},
		{
			str:'2. Do let the sun go down on anger.',
			rate: '4.5/5'
		},
		{
			str:'3. Buy some happiness.',
			rate: '4/5'
		},
		{
			str:'4. Don’t insist on the best.',
			rate: '4.3/5'
		}
	];
	else if($scope.mood ==='Excited')
	$scope.strategys = [
		{str:'Excited strategy 1',rate: '4.3/5'},
		{str:'Excited strategy 2',rate: '4.3/5'},
		{str:'Excited strategy 3',rate: '4.3/5'},
		{str:'Excited strategy 4',rate: '4.3/5'}
	];
	else{
		$scope.strategys = [
			{str:'mood strategy 1',rate: '4.3/5'},
			{str:'mood strategy 2',rate: '4.3/5'},
			{str:'mood strategy 3',rate: '4.3/5'},
			{str:'mood strategy 4',rate: '4.3/5'}
		];
	}
});
