burdenBidderApp.controller('loginController', function($scope, $http, $location, UserService, $rootScope) {
    //scope are out variables that we use to communicate with the html
    $scope.email;
    $scope.password;

    $scope.errors = false;
    $scope.message;

    //these are functions that we can use in our html
    $scope.login = function() {
        if(!email || !password) {
            $scope.message = 'All fields are required';
            $scope.errors = true;
        } else {
            firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password)
            .then(function(user){
                UserService.setUser(user);
                $rootScope.$apply(function() {
                    $location.path('/home');
                });
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                $rootScope.$apply(function() {
                    $scope.message = errorMessage;
                    $scope.errors = true;
                });
            });

        }
    };
});