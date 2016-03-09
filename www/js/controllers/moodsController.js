app.controller('moodsController', function($scope, datastore) {
	datastore.addContainer('People', {
	    username: datastore.types.String,
	    now: datastore.types.Date,
	});

	datastore.save("People", {username:"test", now: new Date()});
});