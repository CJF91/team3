app.controller('moodsController', function($rootScope, $scope, $location, $ionicActionSheet, $ionicPopup, $ionicScrollDelegate, $ionicPosition, datastore) {
	$scope.go = function(path) {
      $location.path(path);
    };

	$scope.getAllMoodEvents = function() {
		var moods = datastore.getAll("MoodEvent");
		moods.sort(function(a,b) { 
			return -(new Date(a.date).getTime() - new Date(b.date).getTime()); 
		});
		return moods;
	}
	
	$scope.datastore = datastore;
	
    $scope.moods = $scope.getAllMoodEvents();
	
    $scope.options = {
        showDelete: false,
        canSwipe: true
    };

    $scope.editMood = function(mood) {
        mood.mood += 1;
    };
	
	$scope.getSrc = function(mood) {
		if (mood != null && 'mood' in mood) {
			switch (datastore.get("Mood", mood.mood).type) {
				case 0:
					return "happy.png";
				case 1:
					return "excited.png";
				case 2:
					return "tender.png";
				case 3:
					return "scared.png";
				case 4:
					return "angry.png";
				case 5:
					return "sad.png";
				default:
					return "";
			}
		}
		return "";
	};

    $scope.selectedIndex = -1;
    $scope.keepSelected = false;
	$rootScope.editMood = null;
	$scope.returnScroll = 0;
    $scope.moodHoldActions = function(mood, index) {
        $scope.keepSelected = false;
        $scope.selectedIndex = index;
		$scope.returnScroll = $ionicScrollDelegate.getScrollPosition().top;
        var scrollPosition = $ionicPosition.position(angular.element(document.getElementById('id' + index)));
        var itemHeight = document.getElementById("id" + index).offsetHeight;
        var listHeight = angular.element(document.querySelector('#list'))[0].clientHeight;
        while ($scope.moods.length < index + listHeight / itemHeight) {
            $scope.moods.push({
                filler: true
            });
            $scope.filledCount += 1;
        }
        $ionicScrollDelegate.scrollTo(0, scrollPosition.top + 1, true);
        var $hideActions = $ionicActionSheet.show({
            buttons: [{
                text: 'View / Edit'
            }],
            buttonClicked: function(index) {
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
							$scope.selectedIndex = -1;
							datastore.removeDocument("MoodEvent", $scope.moods[index].id);
							$scope.moods = $scope.getAllMoodEvents();
							$ionicScrollDelegate.scrollTo(0, $scope.returnScroll, true);
							$ionicScrollDelegate.resize();
                        }
                    }]
                });
            },
            cancelText: 'Cancel',
            cancel: function() {
                if ($scope.keepSelected == false) {
                    $scope.selectedIndex = -1;
					$scope.moods = $scope.getAllMoodEvents();
					$ionicScrollDelegate.scrollTo(0, $scope.returnScroll, true);
					$ionicScrollDelegate.resize();
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
		var min = date.getMinutes() > 9 ? date.getMinutes() : date.getMinutes() + "0";
		var ampm = date.getHours() > 11 ? "PM" : "AM";
		return monthNames[monthIndex] + " " + day + ", " + year + " " + hour + ":" + min + " " + ampm;
	};
	
});
