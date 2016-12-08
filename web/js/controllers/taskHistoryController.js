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

    vm.completeTask = function(taskId) {
        var updatedTask = {
            Id: taskId
        };

        $http({
            method: 'POST',
            url: 'http://localHost:8080/completeTask',
            data : updatedTask
        }).then(function(response) {
            //success
            alert("Task completed! Please leave a review on the task creator's profile!..");
            setTimeout(function(){
                console.log('routing...');
                $rootScope.$apply(function() {
                    $location.path('/review/' + taskId);
                });
            }, 1000);

        }).catch(function(error){
            console.log(error);
        });
    };

    vm.payTask = function(taskId) {
        var updatedTask = {
            Id: taskId
        };

        $http({
            method: 'POST',
            url: 'http://localHost:8080/payTask',
            data : updatedTask
        }).then(function(response) {
            //success
            alert("Your payment went through successfully! Please leave a review on the task bidder's profile!");
            setTimeout(function(){
                console.log('routing...');
                $rootScope.$apply(function() {
                    $location.path('/review/' + taskId);
                });
            }, 1000);

        }).catch(function(error){
            console.log(error);
        });
    };

    vm.contactInformation = function(creatorId) {
        var creator = {
            userId : creatorId
        };
        var message = '';

        $http({
            method: 'POST',
            url: 'http://localHost:8080/getAccount',
            data : creator
        }).then(function(response) {
            var name = response.data.firstName + ' ' + response.data.lastName;
            var phoneNo = response.data.phoneNo;

            message += '\n' + 'Name: ' + name + '\n' + 'Phone: ' + phoneNo;
        }).catch(function(error){
            console.log(error);
        });

        var reviewData = {
            relatedTo : creatorId
        };
        //getting reviews
        $http({
            method: 'POST',
            url: 'http://localHost:8080/getReviews',
            data : reviewData
        }).then(function(response) {
            vm.reviews = $.map(response.data, function(value, index) {
                return [value];
            });
            var sum = 0;
            var amount = 0;
            for(var i = 0; i < vm.reviews.length; ++i) {
                sum+= parseInt(vm.reviews[i].rating);
                amount++;
            }
            vm.averageReview = parseInt((sum/amount));
            message += '\n' + 'Rating: ' + vm.averageReview + '/ 5';
            console.log(response);

            setTimeout(function() {
                alert(message);
            }, 1000);
        }).catch(function(error){
            console.log(error);
        });

    };

    vm.rejectBidder = function(bidderId, taskId) {
        var data = {
            taskBidderId : '',
            Id : taskId
        };
        $http({
            method: 'POST',
            url: 'http://localHost:8080/rejectBidder',
            data : data
        }).then(function(response) {
            setTimeout(function() {
                $rootScope.$apply(function() {
                   $location.path('/home');
                });
            }, 500);
        }).catch(function(error){
            console.log(error);
        });
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
