burdenBidderApp.controller('homeController', function($scope, $http, $location, UserService, $rootScope) {

    //check for auth
    angular.element(document).ready(function () {
        if(!UserService.getUser()) {
            $rootScope.$apply(function () {
                $location.path('/');
            });
        }
    });

    var posts = [];


    var data = {
        title : 'Mow my lawn',
        description : 'I need a strong man to mow my lawn.',
        category : 'Lawn Care',
        openingPrice : '50.00',
        currentBid : '45.00',
        taskCreatorId : UserService.getUser().uid
    };

    //uncomment this for creating tasks
    // $http({
    //     method: 'POST',
    //     url: 'https://burdenbidderbacken.herokuapp.com/createTask',
    //     data: data
    // }).then(function(response) {
    //     alert(response.message);
    // }).catch(function(error){
    //     alert(error.message);
    // });


    data = {
        userId : UserService.getUser().uid
    };

    //getting tasks
    $http({
        method: 'POST',
        url: 'https://burdenbidderbacken.herokuapp.com/getAllTasks',
        data : data
    }).then(function(response) {
        console.log(response);
        posts = response.data;
    }).catch(function(error){
        alert(error.message);
    });

});