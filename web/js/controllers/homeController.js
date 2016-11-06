burdenBidderApp.controller('homeController', function($scope, $http, $location, UserService, $rootScope, $interval, $q) {

    //check for auth
    angular.element(document).ready(function () {
        if(!firebase.auth().currentUser) {
            $rootScope.$apply(function () {
                $location.path('/');
            });
        }
    });

    //$scope.tasks = [];
    $scope.name = '';
    var inter;

    var startTimer = function(){
       inter = $interval( function () {

        }, 1000);
    };

    $scope.$on('$destroy', function() {
        // Make sure that the interval is destroyed too
        $interval.cancel(inter);
    });
    data = {
        userId : UserService.getUser().uid
    };

    $http({
        method: 'POST',
        url: 'http://localhost:8080/getAccount',
        data : data
    }).then(function(response) {
        $scope.name = response.data.firstName;
    }).catch(function(error){
        console.log(error);
    });

    //getting tasks
    $http({
        method: 'POST',
        url: 'http://localhost:8080/getAllTasks',
        data : data
    }).then(function(response) {
        $scope.tasks = $.map(response.data, function(value, index) {
            return [value];
        });
        setTimeout(function(){
            startTimer();
        }, 1000);
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