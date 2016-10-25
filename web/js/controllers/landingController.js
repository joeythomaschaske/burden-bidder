burdenBidderApp.controller('landingController', function($scope, $http, $location) {

    //these are functions that we can use in our html
    $scope.login = function() {
        $location.path('/login');
    };

    $scope.signUp = function() {
        $location.path('/signup');
    };
});