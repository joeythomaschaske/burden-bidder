burdenBidderApp.controller('homeController', function($scope, $http, $location, UserService, $rootScope) {

    //check for auth
    angular.element(document).ready(function () {
        if(!UserService.getUser()) {
            $rootScope.$apply(function () {
                $location.path('/');
            });
        }
    });

    $scope.tasks = [];

    data = {
        userId : UserService.getUser().uid
    };

    //getting tasks
    $http({
        method: 'POST',
        url: 'http://localhost:8080/getAllTasks',
        data : data
    }).then(function(response) {
        $scope.tasks = response.data;
        console.log(response);
    }).catch(function(error){
        console.log(error);
    });

});