app.controller('splashController', function($scope, datastore,$rootScope,$window) {
	//TODO: Fix this up and make it actually use the users pin
	//1234 is the dummy pin for now

	// The current code (April 11th) to delete everything from the datastore
	/*
	   	delete window.localStorage.models;
	    delete window.localStorage.Behavior
	    delete window.localStorage.MoodEvent
	    delete window.localStorage.Mood;
	    delete window.localStorage.Trigger
	    delete window.localStorage.Behavior
	    delete window.localStorage.Belief
	    delete window.localStorage.CopingStrategy
	    delete window.localStorage.accessKey
	    delete window.localStorage.Preferences
	 */   

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
	    datastore.addContainer('Moods', {
	      'name' : datastore.types.String,
	      'type' : datastore.types.Number, // Get From Mood Type List
	    });

	    datastore.addContainer('Triggers', {
	      'name' : datastore.types.String,
	    });

	    datastore.addContainer('Behaviors', {
	      'name' : datastore.types.String,
	    });

	    datastore.addContainer('Beliefs', {
	      'name' : datastore.types.String,
	    });

	    datastore.addContainer('CopingStrategies', {
	      'name' : datastore.types.String,
	    });

	    $rootScope.MoodTypeList = ["Happy","Excited","Tender","Scared","Angry","Sad"];

	    // Test Data

	    var happy = datastore.save('Moods', {
	    	'name' : 'Happy',
	    	'type' : 0
	    });
	    var excited = datastore.save('Moods', {
	    	'name' : 'Excited',
	    	'type' : 1
	    });
	    var tender = datastore.save('Moods', {
	    	'name' : 'Tender',
	    	'type' : 2
	    });
	    var scared = datastore.save('Moods', {
	    	'name' : 'Scared',
	    	'type' : 3
	    });
	    var angry = datastore.save('Moods', {
	    	'name' : 'Angry',
	    	'type' : 4
	    });
	    var sad = datastore.save('Moods', {
	    	'name' : 'Sad',
	    	'type' : 5
	    });
	    var excentric = datastore.save('Moods', {
	    	'name' : 'excentric',
	    	'type' : 2
	    });
	    var vampire = datastore.save('Moods', {
	    	'name' : 'vampire',
	    	'type' : 2
	    });	

	    var testMoodArray = [happy,excited,tender,scared,angry,sad,excentric,vampire];

	    var test = datastore.save('Triggers',{
	    	'name' : 'I have a test'
	    });
	    var pain = datastore.save('Triggers',{
	    	'name' : 'I was hurt today'
	    });
	    var fired = datastore.save('Triggers',{
	    	'name' : 'Fired from Job'
	    });

	    var testTriggerArray = [test,pain,fired];

	    var bandAid = datastore.save('Behaviors', {
	    	'name' : 'I got over it and put a bandaid on it'
	    });
	    var wimpyBandAid = datastore.save('Behaviors', {
	    	'name' : 'I cried in a corner over my minor injury'
	    });
	    var emotionalDamage = datastore.save('Behaviors',{
	    	'name' : 'I was emotionally damaged and won\'t be able to live with this problem'
	    });

	    var testBehaviorArray = [bandAid,wimpyBandAid,emotionalDamage];

	    var drunk = datastore.save('Beliefs',{
	    	'name' : 'I will be drunk :)'
	    });
	    var hurt = datastore.save('Beliefs',{
	    	'name' : 'That Hurt'
	    });
	    var fail = datastore.save('Beliefs',{
	    	'name' : 'I will fail my test'
	    });
	    var money = datastore.save('Beliefs',{
	    	'name' : 'Damn I will be broke'
	    });
	    var america = datastore.save('Beliefs',{
	    	'name' : "I'll make America great again"
	    });

	    var testBeliefArray = [drunk,hurt,fail,money,america];

	    var adjustableDate = new Date(2000,0,0)
	    for(var i = 0; i < 100;i++){
	    	datastore.save('MoodEvent',{
	    		'mood' :  testMoodArray[Math.floor(Math.random()*(testMoodArray.length))].id,
	    		'level' : Math.floor(Math.random()* 10),
	    		'trigger' : testTriggerArray[Math.floor(Math.random()*(testTriggerArray.length))].id,
	    		'behavior' : testBehaviorArray[Math.floor(Math.random()*(testBehaviorArray.length))].id,
	    		'belief' : testBeliefArray[Math.floor((Math.random()*testBeliefArray.length))].id,
	    		'date' : adjustableDate
	    	});
	    	adjustableDate.setTime(adjustableDate.getTime() + 6*60*60*1000)
	    }	 
	}
});