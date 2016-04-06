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
		var key = aesjs.util.convertStringToBytes("Example128BitKey");

		// Convert text to bytes
		var text = 'Text may be any length you wish, no padding is required.';
		var textBytes = aesjs.util.convertStringToBytes(text);

		// The counter is optional, and if omitted will begin at 0
		var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
		var encryptedBytes = aesCtr.encrypt(textBytes);

		// The counter mode of operation maintains internal state, so to
		// decrypt a new instance must be instantiated.
		var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
		var decryptedBytes = aesCtr.decrypt(encryptedBytes);

		// Convert our bytes back into text
		var decryptedText = aesjs.util.convertBytesToString(decryptedBytes);
		console.log(decryptedText);
		
					
		datastore.setAccessKey("hello world");
		//datastore.initalizeAccess("hello world");

		datastore.addContainer("Fruit", {name : datastore.types.String, weight : datastore.types.Number});
		var savedDoc = datastore.save("Fruit", {name: "Orange", weight: 3.2});

		console.log(savedDoc);

	//	console.log(datastore.getAll("Fruit"));*/

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