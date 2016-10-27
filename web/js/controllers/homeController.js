burdenBidderApp.controller('homeController', function($scope, $http, $location, UserService, $rootScope) {

    //check for auth
    angular.element(document).ready(function () {
        if(!UserService.getUser()) {
            $rootScope.$apply(function () {
                $location.path('/');
            });
        }
    });

    var posts = [];

});