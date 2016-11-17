burdenBidderApp.controller('taskDetailController', function($scope, $routeParams, $http, $location, UserService, $rootScope) {

    var vm = this;
    //check for auth
    angular.element(document).ready(function () {
        if(!firebase.auth().currentUser) {
            $rootScope.$apply(function () {
                $location.path('/');
            });
        }
    });

    var initMap = function() {
        var uluru = {lat: vm.task.lat, lng: vm.task.long};
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: uluru
        });
        var marker = new google.maps.Marker({
            position: uluru,
            map: map
        });
    }

    var userData = {
        userId : UserService.getUser().uid
    };

    var taskData = {
        taskId : $routeParams.Id
    };

    vm.bidAmount = 0;
    vm.doBid = doBid;


    function doBid() {
        // Updating task. TODO: Only update currentBid field.
        taskData.currentBid = taskData.currentBid - vm.bidAmount;
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
