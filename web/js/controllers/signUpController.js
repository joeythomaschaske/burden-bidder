burdenBidderApp.controller('signUpController', function($scope, $http, $location, UserService, $rootScope) {
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
            setTimeout(function(){
                $rootScope.$apply(function() {
                    $location.path('/home');
                });
            }, 2000);
        }
    };

    function register() {
        firebase.auth().createUserWithEmailAndPassword($scope.email, $scope.password)
        .then(function (user) {
            console.log(user);
            UserService.setUser(user);
            createAccount();
        })
        .catch(function (error) {
            $scope.message = error.message;
            alert($scope.message);
        });
    }

    function createAccount() {
        var data = {
            firstName : $scope.firstName,
            lastName : $scope.lastName,
            email : $scope.email,
            dateOfBirth : $scope.dateOfBirth,
            phoneNo : $scope.phoneNo,
            street : $scope.street,
            city : $scope.city,
            stateCode: $scope.stateCode,
            zip: $scope.zip,
            userId: UserService.getUser().uid
        };

        $http({
            method: 'POST',
            url: 'https://localhost:8080/create',
            data: data
        }).then(function(response) {

        }).catch(function(error){

        });
    }
});