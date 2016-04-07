app.controller('preferencesController', function($scope, $cordovaImagePicker, datastore) {
	$scope.formData = {pinEnabled: false, pin: ""};
	
	/*datastore.addContainer('Preferences', {
		prefName: datastore.types.String,
		prefValue: datastore.types.Any
	});

	var savedPrefs = datastore.getAll('Preferences');

	for (var i = 0; i < savedPrefs.length; i++) {
		$scope.formData[savedPrefs[i].prefName] = savedPrefs[i].prefValue;
	}*/

	$scope.changePref = function(pref) {
		//var encrypted = datastore.encrypt("hello world!", "99999999999999999999999999999999");
		//var dec = datastore.decrypt(encrypted, "99999999999999999999999999999999");
		
		datastore.setAccessKey("yoloswag");
		//datastore.initalizeAccess("");

		datastore.addContainer("Fruit", {name : datastore.types.String, weight : datastore.types.Number});
		var savedDoc = datastore.save("Fruit", {name: "Orange", weight: 3.2});

		console.log(savedDoc);
		console.log(datastore.getAll("Fruit"));
		console.log(window.localStorage);

		if (pref == 'splash') {
			var options = {
			   maximumImagesCount: 10,
			   width: 800,
			   height: 800,
			   quality: 80
			  };

			  $cordovaImagePicker.getPictures(options)
			    .then(function (results) {
			      for (var i = 0; i < results.length; i++) {
			        console.log('Image URI: ' + results[i]);
			      }
			    }, function(error) {
			      // error getting photos
			    });
		} else if (pref == 'pinEnabled') {
			//datastore.upsert('Preferences', {prefName: 'pinEnabled', prefValue: $scope.formData.pinEnabled}, 'prefName');
		}
	}
});