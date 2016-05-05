app.controller('OOBEController', function ($scope, datastore, $state) {
  datastore.addContainer('setup', {
    username: datastore.types.String,
    newkey: datastore.types.Number
  });

  if (datastore.getAll('setup').length != 0){
    $state.go('tab.splash');
  }

  $scope.start = function() {
    if($scope.NewPin === $scope.ConPin){
      datastore.setAccessKey($scope.NewPin);
      datastore.save('setup',{
        username: $scope.UserName,
        newkey: $scope.NewPin
      });
		  $state.go('tab.splash');
    }
	};

});
