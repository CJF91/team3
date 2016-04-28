app.controller('newMoodsController', function($scope, datastore, $location, $ionicModal) {

    var newLog = {
        mood: 0,
        level: 0,
        trigger: 0,
        behavior: 0,
        belief: 0,
        date: new Date()
    };

    $scope.doc = {
        mood: "None",
        level: 0,
        trigger: "None",
        behavior: "None",
        belief: "None",
        date: new Date()
    };

    $scope.modalData = {
        header: "Header",
        items: [{name: "item 1"}, {name: "item2"}],
        id: 0
    };

    datastore.upsert("Mood", {
        name: "Happy",
        type: 0
    }, "name");
    datastore.upsert("Mood", {
        name: "Excited",
        type: 1
    }, "name");
    datastore.upsert("Mood", {
        name: "Tender",
        type: 2
    }, "name");
    datastore.upsert("Mood", {
        name: "Scared",
        type: 3
    }, "name");
    datastore.upsert("Mood", {
        name: "Angry",
        type: 4
    }, "name");
    datastore.upsert("Mood", {
        name: "Sad",
        type: 5
    }, "name");

    $ionicModal.fromTemplateUrl("templates/tab-moods-new-modal.html", {
        scope: $scope,
        animation: "slide-in-up"
    }).then(function(modal) {
        $scope.modal = modal;
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

    $scope.itemSelected = function(item) {
        switch ($scope.modalData.id) {
            case 1:
                $scope.doc.mood = item.name;
                newLog.mood = item.id;
                $scope.modal.hide();
								break;
						case 2:
								$scope.doc.trigger = item.name;
								newLog.trigger = item.id;
								$scope.modal.hide();
								break;
						case 3:
								$scope.doc.behavior = item.name;
								newLog.behavior = item.id;
								$scope.modal.hide();
								break;
						case 4:
								$scope.doc.belief = item.name;
								newLog.belief = item.id;
								$scope.modal.hide();
								break;
            default:
								$scope.modal.hide();
        };
    }

    $scope.closeModal = function() {
        $scope.modal.hide();
    }

    $scope.chooseMood = function(mood) {
        $scope.doc.mood = mood.name;
        newLog.mood = mood.id;
    };

    $scope.chooseTrigger = function(trigger) {
        $scope.doc.trigger = trigger.name;
        newLog.trigger = trigger.id;
    };

    $scope.chooseBehavior = function(behavior) {
        $scope.doc.behavior = behavior.name;
        newLog.behavior = behavior.id;
    };

    $scope.chooseBelief = function(belief) {
        $scope.doc.belief = belief.name;
        newLog.belief = belief.id;
    };

    $scope.addLog = function() {
        newLog.level = $scope.doc.level;
        datastore.upsert("MoodEvent", newLog, "date");
        $location.path("/tab/moods");
    };

    $scope.$on("$destroy", function() {
        $scope.modal.remove();
    });
});
