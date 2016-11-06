burdenBidderApp.controller('taskDetailController', function($scope, $routeParams, $http, $location, UserService, $rootScope) {

    //check for auth
    angular.element(document).ready(function () {
        if(!firebase.auth().currentUser) {
            $rootScope.$apply(function () {
                $location.path('/');
            });
        }
    });

    var userData = {
        userId : UserService.getUser().uid
    };

    var taskData = {
        taskId : $routeParams.Id
    };

    $scope.bidAmount = 0;
    $scope.doBid = doBid;


    function doBid() {
        // Updating task. TODO: Only update currentBid field.
        taskData.currentBid = taskData.currentBid - $scope.bidAmount;
        $http({
            method: 'POST',
            url: 'http://localHost:8080/createTask',
            data: data
        }).then(function(response) {
            setTimeout(function(){
                $rootScope.$apply(function() {
                    $location.path('/taskDetail/:' + taskData.taskId);
                });
            }, 3000);
        }).catch(function(error){
        });
    }

    //getting Task
    $http({
        method: 'POST',
        url: 'http://localHost:8080/getTask',
        data : taskData
    }).then(function(response) {
        $scope.task = response.data;
        console.log(response);
    }).catch(function(error){
        console.log(error);
    });

    //getting Account
    $http({
        method: 'POST',
        url: 'http://localHost:8080/getAccount',
        data : userData
    }).then(function(response) {
        $scope.user = response.data;
        console.log(response);
    }).catch(function(error){
        console.log(error);
    });

});
