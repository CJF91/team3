app.controller('editMoodsController', function($rootScope, $scope, datastore, $location, $ionicModal) {
	
	var updateLog = {
		mood: $rootScope.editMood.mood,
		level: $rootScope.editMood.level,
		trigger: $rootScope.editMood.trigger,
		behavior: $rootScope.editMood.behavior,
		belief: $rootScope.editMood.belief,
		date: new Date($rootScope.editMood.date),
	};
	
	$scope.doc = {
		mood: datastore.get("Mood", $rootScope.editMood.mood).name,
		level: $rootScope.editMood.level,
		trigger: datastore.get("Trigger", $rootScope.editMood.trigger).name,
		behavior: datastore.get("Behavior", $rootScope.editMood.behavior).name,
		belief: datastore.get("Belief", $rootScope.editMood.belief).name,
		date: new Date($rootScope.editMood.date),
	};
	
    $scope.modalData = {
        header: "Header",
        items: [{
            name: "item 1"
        }, {
            name: "item2"
        }],
        id: 0
    };

    $scope.modalData2 = {
        header: "Header",
        input: "",
        name: "",
        isMood: false,
        type: ""
    };
	
    $ionicModal.fromTemplateUrl("templates/tab-moods-new-modal.html", {
        scope: $scope,
        animation: "slide-in-up"
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $ionicModal.fromTemplateUrl("templates/tab-moods-new-modal2.html", {
        scope: $scope,
        animation: "slide-in-up"
    }).then(function(modal) {
        $scope.modal2 = modal;
    });
	
    $scope.openModal = function(id) {
        $scope.modal.show();

        switch (id) {
            case 1:
                $scope.modalData.header = "Select Mood";
                $scope.modalData.id = 1;
                $scope.modalData.items = datastore.getAll("Mood");
                break;
            case 2:
                $scope.modalData.header = "Select Trigger";
                $scope.modalData.id = 2;
                $scope.modalData.items = datastore.getAll("Trigger");
                break;
            case 3:
                $scope.modalData.header = "Select Behavior";
                $scope.modalData.id = 3;
                $scope.modalData.items = datastore.getAll("Behavior");
                break;
            case 4:
                $scope.modalData.header = "Select Belief";
                $scope.modalData.id = 4;
                $scope.modalData.items = datastore.getAll("Belief");
                break;
            default:
                $scope.modalData.header = "Error";
        };
    };

    $scope.openModal2 = function() {
        $scope.modal2.show();
        switch ($scope.modalData.id) {
            case 1:
                $scope.modalData2.header = "Enter New Mood";
                $scope.modalData2.input = "Mood: ";
                $scope.modalData2.isMood = true;
                break;
            case 2:
                $scope.modalData2.header = "Enter New Trigger";
                $scope.modalData2.input = "Trigger: ";
                $scope.modalData2.isMood = false;
                break;
            case 3:
                $scope.modalData2.header = "Enter New Behavior";
                $scope.modalData2.input = "Behavior: ";
                $scope.modalData2.isMood = false;
                break;
            case 4:
                $scope.modalData2.header = "Enter New Belief";
                $scope.modalData2.input = "Belief: ";
                $scope.modalData2.isMood = false;
                break;
            default:
                $scope.modalData.header = "Error";
        };
    }

    $scope.itemSelected = function(item) {
        switch ($scope.modalData.id) {
            case 1:
                $scope.doc.mood = item.name;
                updateLog.mood = item.id;
                $scope.modal.hide();
                break;
            case 2:
                $scope.doc.trigger = item.name;
                updateLog.trigger = item.id;
                $scope.modal.hide();
                break;
            case 3:
                $scope.doc.behavior = item.name;
                updateLog.behavior = item.id;
                $scope.modal.hide();
                break;
            case 4:
                $scope.doc.belief = item.name;
                updateLog.belief = item.id;
                $scope.modal.hide();
                break;
            default:
                $scope.modal.hide();
        };
    }

    $scope.save = function() {
        switch ($scope.modalData.id) {
            case 1:
                datastore.upsert("Mood", {name: $scope.modalData2.name, type: parseInt($scope.modalData2.type)}, "name");
                $scope.modalData.items = datastore.getAll("Mood");
                $scope.modalData2.name = "";
                $scope.modalData2.type = "";
                $scope.modal2.hide();
                break;
            case 2:
                datastore.upsert("Trigger", {name: $scope.modalData2.name}, "name")
                $scope.modalData.items = datastore.getAll("Trigger");
                $scope.modalData2.name = "";
                $scope.modal2.hide();
                break;
            case 3:
                datastore.upsert("Behavior", {name: $scope.modalData2.name}, "name")
                $scope.modalData.items = datastore.getAll("Behavior");
                $scope.modalData2.name = "";
                $scope.modal2.hide();
                break;
            case 4:
                datastore.upsert("Belief", {name: $scope.modalData2.name}, "name")
                $scope.modalData.items = datastore.getAll("Belief");
                $scope.modalData2.name = "";
                $scope.modal2.hide();
                break;
            default:
                $scope.modalData2.name = "";
                $scope.modal2.hide();
        };
    }

    $scope.closeModal = function() {
        $scope.modal.hide();
    }

    $scope.closeModal2 = function() {
        $scope.modal2.hide();
    }

    $scope.chooseMood = function(mood) {
        $scope.doc.mood = mood.name;
        updateLog.mood = mood.id;
    };

    $scope.chooseTrigger = function(trigger) {
        $scope.doc.trigger = trigger.name;
        updateLog.trigger = trigger.id;
    };

    $scope.chooseBehavior = function(behavior) {
        $scope.doc.behavior = behavior.name;
        updateLog.behavior = behavior.id;
    };

    $scope.chooseBelief = function(belief) {
        $scope.doc.belief = belief.name;
        updateLog.belief = belief.id;
    };

	$scope.update = function() {
		$rootScope.editMood.mood = updateLog.mood;
        $rootScope.editMood.level = parseInt($scope.doc.level);
		$rootScope.editMood.trigger = updateLog.trigger;
		$rootScope.editMood.behavior = updateLog.behavior;
		$rootScope.editMood.belief = updateLog.belief;
		$rootScope.editMood.date = updateLog.date;
		id = $rootScope.editMood.id;
		delete $rootScope.editMood['id'];
		datastore.save("MoodEvent", $rootScope.editMood, id);
		$location.path("/tab/moods");
	};
	
});
