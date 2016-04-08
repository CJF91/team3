app.controller('splashController', function($scope, datastore,$rootScope) {
	//TODO: Fix this up and make it actually use the users pin
	//1234 is the dummy pin for now

	if (datastore.isEncrypted()) {
		datastore.initalizeAccess("1234");
	} else {
		datastore.setAccessKey("1234");
		 // The General Model for Moods, Beliefs Triggers and Behaviors. Can be changed and is only here for consistentcy.

	    // The user logging the Mood.
	    datastore.addContainer('MoodEvent', {
	      'mood' : datastore.types.Number,
	      'level' : datastore.types.Number,
	      'trigger' : datastore.types.Number,
	      'behavior' : datastore.types.Number,
	      'belief' : datastore.types.Number,
	      'date' : datastore.types.Date,
	    });

	    // The List of Moods (including Custom)
	    datastore.addContainer('Mood', {
	      'name' : datastore.types.String,
	      'type' : datastore.types.Number, // Get From Mood Type List
	    });

	    datastore.addContainer('Trigger', {
	      'name' : datastore.types.String,
	    });

	    datastore.addContainer('Behavior', {
	      'name' : datastore.types.String,
	    });

	    datastore.addContainer('Belief', {
	      'name' : datastore.types.String,
	    });

	    datastore.addContainer('CopingStrategy', {
	      'name' : datastore.types.String,
	    });

	    $rootScope.MoodTypeList = ["Happy","Excited","Tender","Scared","Angry","Sad"];
	}
});