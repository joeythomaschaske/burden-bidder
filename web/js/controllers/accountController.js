burdenBidderApp.controller('accountController', function($http, $location, UserService, $rootScope) {
    var vm = this;
    //check for auth
    angular.element(document).ready(function () {
        if(!firebase.auth().currentUser) {
            $rootScope.$apply(function () {
                $location.path('/');
            });
        }
    });
    vm.editForm = false;
    vm.edit = function(){
        vm.editForm = true;
    };



    vm.save = function(){
        vm.editForm = false;

        //Data setup
        var userIdKey = UserService.getUser().uid;
        var newData = {
            email: vm.user.email,
            userId: userIdKey,
            firstName: vm.user.firstName,
            lastName: vm.user.lastName,
            dateOfBirth: vm.user.dateOfBirth,
            phoneNo: vm.user.phoneNo,
            street: vm.user.street,
            city: vm.user.city,
            stateCode: vm.user.stateCode,
            zip: vm.user.zip
        };
        console.log(newData);
        $http({
            method: 'POST',
            url: 'http://localhost:8080/create',
            data: newData
        }).then(function (response) {
        }).catch(function(error){
            console.log(error);
        });
    };

    data = {
        userId : UserService.getUser().uid
    };

    //getting tasks
    $http({
        method: 'POST',
        url: 'http://localhost:8080/getAccount',
        data : data
    }).then(function(response) {
        vm.user = response.data;
        console.log('Getting account');
        console.log(response.data);
    }).catch(function(error){
        console.log(error);
    });

});