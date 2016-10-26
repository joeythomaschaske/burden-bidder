burdenBidderApp.controller('signUpController', function($scope, $http, $location, UserService) {
    //scope are out variables that we use to communicate with the html
    $scope.formOne = true;
    $scope.errors = false;
    $scope.message;

    $scope.firstName;
    $scope.lastName;
    $scope.email;
    $scope.password;
    $scope.confirmPass;
    $scope.agreeToTerms;

    $scope.dateOfBirth;
    $scope.phoneNo;
    $scope.street;
    $scope.city;
    $scope.stateCode;
    $scope.zip;

    $scope.next = function() {
        if(!$scope.firstName || !$scope.lastName || !$scope.email || !$scope.password || !$scope.confirmPass || !$scope.agreeToTerms) {
            $scope.errors = true;
            $scope.message = 'All fields are required';
        } else if ($scope.password !== $scope.confirmPass) {
            $scope.errors = true;
            $scope.message = 'Passwords must match';
        } else {
            $scope.errors = false;
            $scope.formOne = !$scope.formOne;
        }
    };

    $scope.prev = function() {
        $scope.formOne = !$scope.formOne;
    };

    $scope.finish = function() {
        if(!$scope.dateOfBirth || !$scope.phoneNo || !$scope.street || !$scope.city || !$scope.stateCode || !$scope.zip) {
            $scope.errors = true;
            $scope.message = 'All fields are required';
        } else {
            $scope.errors = false;
            register();
        }
    };

    //these are functions that we can use in our html

    function register() {
        try {
            firebase.auth().createUserWithEmailAndPassword($scope.email, $scope.password)
                .then(function (success) {
                    console.log(success);
                })
                .catch(function (error) {
                    $scope.message = error.message;
                    alert($scope.message);
                });
        } catch(exception){
            console.log(exception);
        }
    }
});