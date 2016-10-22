burdenBidderApp.controller('loginController', function($scope, $http, $location) {
    console.log('The controller works');
    //scope are out variables that we use to communicate with the html
    $scope.emailAddress;
    $scope.password;

    //these are functions that we can use in our html
    $scope.login = function() {

        //this is a json object we pass to the backend
        var data = {
            emailAddress : $scope.emailAddress,
            password : $scope.password
        };
        //this is how we pass data to the backend
        //use post to update the database
        //use get to retrieve stuff from the database with no updates neccesarry idk how to fucking spell that word
        $http({
            method: 'POST',
            url: 'https://burdenbidderbacken.herokuapp.com/login',
            data: data
        }).then(function successCallback(response) {
            console.log(response.data.message);
            $scope.response = response.data.message;
            $location()
        }, function errorCallback(response) {
            console.log('error');
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    };
    $scope.go = function() {
        $location.path('/signup') ;
    }

});