burdenBidderApp.controller('taskDetailController', function($scope, $routeParams, $http, $location, UserService, $rootScope, $interval) {

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

    vm.isCreator = false;
    vm.error = {
        "isCorrectAmount": false
    };
    var inter;
    var startTimer = function(){
        inter = $interval( function () {
            var timers = document.getElementsByClassName("timer");
            for(var i = 0; i < timers.length; ++i ) {
                var currentTime = timers[i].innerText;
                var minutes = parseInt(currentTime.split(':')[0]);
                var seconds = parseInt(currentTime.split(':')[1]);

                if (seconds == 0) {
                    minutes -= 1;
                    seconds = 59;
                } else {
                    seconds -= 1;
                }

                if(seconds.toString().length == 1) {
                    seconds = '0' + seconds;
                }
                timers[i].innerText = minutes + ':' + seconds;
            }
        }, 1000);
    };

    $scope.$on('$destroy', function() {
        // Make sure that the interval is destroyed too
        $interval.cancel(inter);
    });

    var userData = {
        userId : UserService.getUser().uid
    };

    var taskData = {
        taskId : $routeParams.Id
    };

    vm.doBid = function doBid() {
        // Updating task. TODO: Only update currentBid field.
        if (task.currentBid <= vm.bidAmount) {
            vm.isCorrectAmount = false;
            return;
        }
        vm.isCorrectAmount = true;

        vm.task.currentBid = vm.bidAmount;
        vm.task.taskBidderId = userData.userId;
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
        if (vm.task.taskCreatorId == userData.userId) vm.isCreator = true;
        vm.location = "https://maps.googleapis.com/maps/api/staticmap?center="+response.data.lat + "," + response.data.long+"&zoom=14&size=400x300&sensor=false&markers=color:blue%7Clabel:S%7C11211%7C11206%7C11222&key=AIzaSyBkDevEaVTA1nfM0ZplMzePTgTpQ2hQRyI";
        console.log(response);
        setTimeout(function(){
            startTimer();
        }, 1000);

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
