burdenBidderApp.controller('signUpController', function($scope, $http) {
    //scope are out variables that we use to communicate with the html
    $scope.firstName;
    $scope.lastName;
    $scope.emailAddress;


    //these are functions that we can use in our html
    $scope.registerUser = function() {

        //this is a json object we pass to the backend
        var data = {
            emailAddress : $scope.emailAddress,
            firstName : $scope.firstName,
            lastName : $scope.lastName
        };

        //this is how we pass data to the backend
        //use post to update the database
        //use get to retrieve stuff from the database with no updates neccesarry idk how to fucking spell that word
        $http({
            method: 'POST',
            url: 'https://burdenbidderbacken.herokuapp.com/signup',
            data: data
        }).then(function successCallback(response) {
            console.log(response.data.message);
            $scope.response = response.data.message;
        }, function errorCallback(response) {
            console.log('error');
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    };
});