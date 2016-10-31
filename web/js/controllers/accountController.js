burdenBidderApp.controller('accountController', function($scope, $http, $location, UserService, $rootScope) {

    //check for auth
    angular.element(document).ready(function () {
        if(!firebase.auth().currentUser) {
            $rootScope.$apply(function () {
                $location.path('/');
            });
        }
    });

    //$scope.user = UserService.getUser();
    //user.name = user.firstName + " " + user.lastName;
    //user.dob = user.dateOfBirth;
    //user.street = user.street;
    //user.state = user.stateCode;
    //user.phoneNo = user.phoneNo;

    data = {
        userId : UserService.getUser().uid
    };

    //getting tasks
    $http({
        method: 'POST',
        url: 'https://burdenbidderbacken.herokuapp.com/getAccount',
        data : data
    }).then(function(response) {
        $scope.user = response.data;
        console.log(response);
    }).catch(function(error){
        console.log(error);
    });

});
