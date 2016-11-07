burdenBidderApp.controller('accountController', function($scope, $http, $location, UserService, $rootScope) {

    //check for auth
    angular.element(document).ready(function () {
        if(!firebase.auth().currentUser) {
            $rootScope.$apply(function () {
                $location.path('/');
            });
        }
    });
    $scope.editForm = false;

    $scope.edit = function(){
        $scope.editForm = true;
    };
    $scope.save = function(){
        $scope.editForm = false;
        $http({
            method: 'POST',
            url: 'http://localhost:8080/create',
            data: user.data
        }).then(function (response) {
            $scope.user = response.data;
            console.log(response);
        }).catch(function(error){
            console.log(error);
        });
    };
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
        url: 'http://localhost:8080/getAccount',
        data : data
    }).then(function(response) {
        $scope.user = response.data;
        console.log(response);
    }).catch(function(error){
        console.log(error);
    });

});
