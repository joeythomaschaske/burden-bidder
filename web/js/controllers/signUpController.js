burdenBidderApp.controller('signUpController', function($scope, $http, $location) {
    //scope are out variables that we use to communicate with the html
    $scope.email
    $scope.password
    $scope.firstName
    $scope.lastName
    $scope.dateOfBirth
    $scope.taskBidder
    $scope.phoneNo
    //$scope.Address : {
    //    $scope.street
    //    $scope.city
    //    $scope.stateCode
    //    $scope.zipCode
    //}


    //these are functions that we can use in our html
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