burdenBidderApp.controller('taskDetailController', function($scope, $routeParams, $http, $location, UserService, $rootScope) {

    console.clear();
    var vm = this;
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

    vm.doBid = function doBid() {
        // Updating task. TODO: Only update currentBid field.
        vm.task.currentBid = vm.task.currentBid - vm.bidAmount;
        $http({
            method: 'POST',
            url: 'http://localHost:8080/updateTask',
            data: vm.task
        }).then(function(response) {
            setTimeout(function(){
                $rootScope.$apply(function() {
                    $location.path('/taskDetail/' + taskData.taskId);
                });
            }, 1000);
        }).catch(function(error){
        });
    }

    //getting Task
    $http({
        method: 'POST',
        url: 'http://localHost:8080/getTask',
        data : taskData
    }).then(function(response) {
        vm.task = response.data;
        vm.location = "https://maps.googleapis.com/maps/api/staticmap?center="+response.data.lat + "," + response.data.long+"&zoom=14&size=400x300&sensor=false&markers=color:blue%7Clabel:S%7C11211%7C11206%7C11222&key=AIzaSyBkDevEaVTA1nfM0ZplMzePTgTpQ2hQRyI";
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
        vm.user = response.data;
        console.log(response);
        $rootScope.$apply(function() {

        });
    }).catch(function(error){
        console.log(error);
    });

});
