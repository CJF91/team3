app.controller('splashController', function($scope, $timeout) {

	$scope.hideStuff = function () {
        $scope.startFade = true;
        $timeout(function(){
            $scope.hidden = true;
        }, 2000);
    }

    

});