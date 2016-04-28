app.controller('moodsController', function($rootScope, $scope, $location, $ionicActionSheet, $ionicPopup, $ionicScrollDelegate, $ionicPosition, datastore) {
	$scope.go = function(path) {
      $location.path(path);
    }

	$scope.datastore = datastore;
	
	// For debugging
	datastore.upsert("Mood", {name: "Happy", type: 1}, "name");
	datastore.upsert("Mood", {name: "Sad", type: 2}, "name");
	datastore.upsert("Mood", {name: "Angry", type: 3}, "name");
	datastore.upsert("Mood", {name: "Calm", type: 4}, "name");
	datastore.upsert("Trigger", {name: ""}, "name");
	datastore.upsert("Belief", {name: ""}, "name");
	datastore.upsert("Behavior", {name: ""}, "name");
	datastore.upsert("Trigger", {name: "T"}, "name");
	datastore.upsert("Belief", {name: "B"}, "name");
	datastore.upsert("Behavior", {name: ""}, "name");
	// End debugging
    $scope.moods = datastore.getAll("MoodEvent");

    $scope.options = {
        showDelete: false,
        canSwipe: true
    };

    $scope.editMood = function(mood) {
        mood.mood += 1;
    };

    $scope.deleteMood = function(index) {
      datastore.removeDocument("MoodEvent", index);
      $scope.moods = datastore.getAll("MoodEvent");
    }
			
	$scope.clearFillers = function() {
		while ($scope.moods[$scope.moods.length - 1].filler) {
			$scope.moods.splice($scope.moods.length - 1, 1);
		}
		$ionicScrollDelegate.resize();
	};
	
    // TODO: Fix when user holds an item and scrolls when the ActionSheet shows up moves the item to unexpected place
    $scope.selectedIndex = -1;
    $scope.keepSelected = false;
	$rootScope.editMood = null;
    $scope.moodHoldActions = function(mood, index) {
        $scope.keepSelected = false;
        $scope.selectedIndex = index;
        var scrollPosition = $ionicPosition.position(angular.element(document.getElementById('id' + index)));
        var itemHeight = document.getElementById("id" + index).offsetHeight;
        var listHeight = angular.element(document.querySelector('#list'))[0].clientHeight;
        while ($scope.moods.length < index + listHeight / itemHeight) {
            $scope.moods.push({
                mood: '',
                filler: true
            });
            $scope.filledCount += 1;
        }
        $ionicScrollDelegate.scrollTo(0, scrollPosition.top + 1, true);
        var $hideActions = $ionicActionSheet.show({
            buttons: [{
                text: 'Edit'
            }],
            buttonClicked: function(index) {
                // Edit (mood)
				$scope.keepSelected = true;
				$rootScope.editMood = mood;
                $hideActions();
				$scope.go('/tab/editMood');
            },
            destructiveText: 'Delete',
            destructiveButtonClicked: function() {
                $scope.keepSelected = true;
                $hideActions();
                $ionicPopup.show({
                    title: 'Are you sure?',
                    subTitle: 'Deleting this mood will permanently remove it from the database',
                    scope: $scope,
                    buttons: [{
                        text: 'Cancel',
                        onTap: function() {
                            $scope.moodHoldActions(mood, index);
                        }
                    }, {
                        text: '<b>Confirm</b>',
                        type: 'button-positive',
                        onTap: function() {
                            // Delete (mood) from datastore
                            $scope.moods.splice(index, 1);
							$scope.clearFillers();
                        }
                    }]
                });
            },
            cancelText: 'Cancel',
            cancel: function() {
                if ($scope.keepSelected == false) {
                    $scope.selectedIndex = -1;
					$scope.clearFillers();
                }
            }
        });
    };
	
	$scope.toDateString = function(date) {
		var monthNames = [
		  "January", "February", "March",
		  "April", "May", "June", "July",
		  "August", "September", "October",
		  "November", "December"
		];
		date = new Date(date);
		var day = date.getDate();
		var monthIndex = date.getMonth();
		var year = date.getFullYear();
		var hour = date.getHours() > 12 ? date.getHours() - 12 : (date.getHours() == 0 ? 12 : date.getHours());
		var min = date.getMinutes();
		var ampm = date.getHours() > 11 ? "PM" : "AM";
		return monthNames[monthIndex] + " " + day + ", " + year + " " + hour + ":" + min + " " + ampm;
	}
});
