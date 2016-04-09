app.controller('moodsController', function($scope, $ionicActionSheet,
        $ionicPopup, $location, $anchorScroll, $ionicScrollDelegate,
        $ionicPosition, datastore) {
        $scope.moods = [
            {mood: 'Happy', time: 1},
            {mood: 'Sad', time: 2},
            {mood: 'Angry', time: 3}];
        $scope.options = {
            showDelete: false,
            canSwipe: true
        };
        $scope.addMood = function() {
            $scope.moods.push({mood: 'Test', time: 4});
        };
        $scope.editMood = function(mood) {
            mood.time += 1;
        };
        $scope.selectedIndex = -1;
		$scope.keepSelected = false;
        $scope.moodHoldActions = function(mood, index) {
			$scope.keepSelected = false;
            $scope.selectedIndex = index;
            var scrollPosition = $ionicPosition.position(angular.element(document.getElementById('id' + index)));
            var itemHeight = document.getElementById("id" + index).offsetHeight;
            var listHeight = angular.element(document.querySelector('#list'))[0].clientHeight;
            var oldLength = $scope.moods.length;
            while ($scope.moods.length < index + listHeight / itemHeight) {
                $scope.moods.push({mood: '', time: -1});
            }
            $ionicScrollDelegate.$getByHandle('content').scrollTo(0, scrollPosition.top, true);
            var $hideActions = $ionicActionSheet.show({
                buttons: [{text: 'Edit'}],
                buttonClicked: function(index) {
                    // Edit (mood)
                    mood.time += 1;
                    $scope.selectedIndex = -1;
                    $scope.moods.splice(oldLength, $scope.moods.length - oldLength);
					$ionicScrollDelegate.resize();
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
                            }
                        }]
                    });
                },
                cancelText: 'Cancel',
                cancel: function() {
                    if ($scope.keepSelected == false) {
						$scope.selectedIndex = -1;
					}
                    $scope.moods.splice(oldLength, $scope.moods.length - oldLength);
					$ionicScrollDelegate.resize();
                }
            });
        };
    });