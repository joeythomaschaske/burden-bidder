burdenBidderApp.controller('taskHistoryController', function($scope, $http, $location, UserService, $rootScope, $interval, $q) {

    var vm = this;
    angular.element(document).ready(function () {
        if(!firebase.auth().currentUser) {
            $rootScope.$apply(function () {
                $location.path('/');
            });
        }
    });

    data = {
        userId : UserService.getUser().uid
    };

    $http({
        method: 'POST',
        url: 'http://localHost:8080/getAccount',
        data : data
    }).then(function(response) {
        vm.userId = response.data.userId;
    }).catch(function(error){
        console.log(error);
    });

    //getting tasks
    $http({
        method: 'POST',
        url: 'http://localHost:8080/getUserBiddedTasks',
        data : data
    }).then(function(response) {
        vm.userBiddedTasks = $.map(response.data, function(value, index) {
            return [value];
        });
    }).catch(function(error){
        console.log(error);
    });
    $http({
        method: 'POST',
        url: 'http://localHost:8080/getUserCreatedTasks',
        data : data
    }).then(function(response) {
        vm.userCreatedTasks = $.map(response.data, function(value, index) {
            return [value];
        });
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
