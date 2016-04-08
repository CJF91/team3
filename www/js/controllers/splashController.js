app.controller('splashController', function($scope, $location, datastore) {
	if(datastore.store() == undefined){
		$location.go('/OOBE');
	}
});