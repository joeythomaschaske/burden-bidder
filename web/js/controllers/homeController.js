burdenBidderApp.controller('homeController', function($scope, $http, $location, UserService, $rootScope, $interval, $q) {

    var vm = this;
    angular.element(document).ready(function () {
        if(!firebase.auth().currentUser) {
            $rootScope.$apply(function () {
                $location.path('/');
            });
        }
    });

    //vm.tasks = [];
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
    data = {
        userId : UserService.getUser().uid
    };

    $http({
        method: 'POST',
        url: 'https://www.burdenbidderbacken.herokuapp.com/getAccount',
        data : data
    }).then(function(response) {
        vm.name = response.data.firstName;
    }).catch(function(error){
        console.log(error);
    });

    //getting tasks
    $http({
        method: 'POST',
        url: 'https://www.burdenbidderbacken.herokuapp.com/getAllTasks',
        data : data
    }).then(function(response) {
        vm.tasks = $.map(response.data, function(value, index) {
            return [value];
        });
        setTimeout(function(){

            startTimer();
        }, 1000);
    }).catch(function(error){
        console.log(error);
    });


    vm.logout = function() {
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