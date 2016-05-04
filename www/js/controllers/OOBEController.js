app.controller('OOBEController', function ($scope, datastore, $state) {
  var check = datastore.get(setup);
  if (check !== null){
    $state.go('tab.splash');
  }
  if(datastore.get(setup))
  $scope.start = function(name,key) {
    datastore.setAccessKey(key);
    datastore.addContainer('setup', {
      username: name,
      key: key
    })
		$state.go('tab.splash');
	};
});
