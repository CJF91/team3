app.controller('splashController', function($scope, datastore) {
	//TODO: Fix this up and make it actually use the users pin
	//1234 is the dummy pin for now

	if (datastore.isEncrypted()) {
		datastore.initalizeAccess("1234");
	} else {
		datastore.setAccessKey("1234");
	}
});