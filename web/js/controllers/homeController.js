burdenBidderApp.controller('homeController', function($scope, $http, $location, UserService, $rootScope) {

    //check for auth
    angular.element(document).ready(function () {
        if(!firebase.auth().currentUser) {
            $rootScope.$apply(function () {
                $location.path('/');
            });
        }
    });

    $scope.tasks = [];
    $scope.name;

    data = {
        userId : UserService.getUser().uid
    };

    $http({
        method: 'POST',
        url: 'https://burdenbidderbacken.herokuapp.com/getAccount',
        data : data
    }).then(function(response) {
        $scope.name = response.data.firstName;
        console.log(response);
    }).catch(function(error){
        console.log(error);
    });

    //getting tasks
    $http({
        method: 'POST',
        url: 'https://burdenbidderbacken.herokuapp.com/getAllTasks',
        data : data
    }).then(function(response) {
        $scope.tasks = response.data;
        console.log(response);
    }).catch(function(error){
        console.log(error);
    });

    $scope.logout = function() {
        firebase.auth().signOut().then(function() {
            $rootScope.$apply(function () {
                $location.path('/');
            });
        }, function(error) {
            $rootScope.$apply(function () {
                $location.path('/');
            });
        });
    };

});