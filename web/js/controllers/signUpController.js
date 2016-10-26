burdenBidderApp.controller('signUpController', function($scope, $http, $location) {
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
        firebase.auth().createUserWithEmailAndPassword($scope.email, $scope.password)
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    }
    $scope.registerUser = function() {
        //this is a json object we pass to the backend
        var data = {
            email : $scope.emailAddress,
            password : $scope.password,
            firstName : $scope.firstName,
            lastName : $scope.lastName,
            dateOfBirth : $scope.dateOfBirth,
            taskBidder : $scope.taskBidder,
            phoneNo : $scope.phoneNo,
            Address : {
                street : $scope.street,
                city : $scope.city,
                stateCode : $scope.stateCode,
                zipCode : $scope.zipCode
            }
        };

        //this is how we pass data to the backend
        //use post to update the database
        //use get to retrieve stuff from the database with no updates neccesarry idk how to fucking spell that word
        $http({
            method: 'POST',
            url: 'http://localhost:8080/signup',
            data: data
        })
        .then(function successCallback(response) {
            console.log(response.data.message);
            $scope.response = response.data.message;
        },
        function errorCallback(response) {
            console.log('error');
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        })
        ;
    };
});