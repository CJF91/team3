app.controller('moodsController', function($scope, datastore) {
	datastore.addContainer('test', {
		name: datastore.types.String
	});

	datastore.save("test", {name: "Cameron"});
});