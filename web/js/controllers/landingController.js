burdenBidderApp.controller('landingController', function($scope, $http, $location) {
    var vm = this;


    vm.login = function() {
        $location.path('/login');
    };

    vm.signUp = function() {
        $location.path('/signup');
    };
});