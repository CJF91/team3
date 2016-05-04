app.controller('OOBEController', function ($scope, datastore, $state) {
  var check = datastore.get(setup);
  if (check !== null){
    $state.go('tab.splash');
  }
  $scope.start = function(name,key) {
    datastore.setAccessKey(key);
    datastore.addContainer('setup', {
      username: datastore.types.String,
      key: datastore.types.Number
    });
    datastore.save('setup',{
      username: name,
      key: key
    })
		$state.go('tab.splash');
	};
});
