app.controller('moodsController', function($scope, $location, $ionicActionSheet, $ionicPopup, $ionicScrollDelegate, $ionicPosition, datastore) {
	$scope.go = function(path) {
      $location.path(path);
    }

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
    // TODO: Fix when user holds an item and scrolls when the ActionSheet shows up moves the item to unexpected place
    $scope.selectedIndex = -1;
    $scope.keepSelected = false;
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
        $ionicScrollDelegate.scrollTo(0, scrollPosition.top, true);
        var $hideActions = $ionicActionSheet.show({
            buttons: [{
                text: 'Edit'
            }],
            buttonClicked: function(index) {
                // Edit (mood)
                mood.level += 1;
                $scope.selectedIndex = -1;
                $hideActions();
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
							$ionicScrollDelegate.resize();
							while ($scope.moods[$scope.moods.length - 1].filler) {
								$scope.moods.splice($scope.moods.length - 1, 1);
							}
                        }
                    }]
                });
            },
            cancelText: 'Cancel',
            cancel: function() {
                if ($scope.keepSelected == false) {
                    $scope.selectedIndex = -1;
                    while ($scope.moods[$scope.moods.length - 1].filler) {
                        $scope.moods.splice($scope.moods.length - 1, 1);
                    }
                    $ionicScrollDelegate.resize();
                }
            }
        });
    };
});
