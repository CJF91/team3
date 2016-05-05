app.controller('preferencesController', function($scope, $cordovaImagePicker, datastore) {
	$scope.formData = {pinEnabled: false, pin: "", verifyPin: "", name: "Johnny Appleseed"};
	datastore.addContainer('Preferences', {
		prefName: datastore.types.String,
		prefValue: datastore.types.Any
	});

	var savedPrefs = datastore.getAll('Preferences');

	for (var i = 0; i < savedPrefs.length; i++) {
		$scope.formData[savedPrefs[i].prefName] = savedPrefs[i].prefValue;
	}

	$scope.$watch('formData', function() {
		datastore.upsert('Preferences', {prefName: 'name', prefValue: $scope.formData.name}, 'prefName');

		if ($scope.pin == $scope.verifyPin) {
			console.log('updaing key')
			datastore.setAccessKey($scope.formData.pin);
		}

		if (!$scope.pinEnabled) {
			datastore.setAccessKey('default_password');
		}

	}, true);

	$scope.changePref = function(pref) {
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
			datastore.upsert('Preferences', {prefName: 'pinEnabled', prefValue: $scope.formData.pinEnabled}, 'prefName');
			
		} else if (pref == 'nameChange') {
			console.log("name preference")
		}
	}
});