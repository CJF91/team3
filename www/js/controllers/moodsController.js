app.controller('moodsController', function($scope, datastore) {
  $scope.moods = [
    {mood: 'Happy', time: 1},
    {mood:'Sad', time: 2},
    {mood:'Angry', time: 3}];
  $scope.options = {
    showDelete: false,
    canSwipe: true
  };
  $scope.addMood = function(){
    $scope.moods.push({mood: 'Test', time: 4});
  };
  $scope.editMood = function(mood){
    mood.time += 1;
  };
});
