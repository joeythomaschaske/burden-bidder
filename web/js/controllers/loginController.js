burdenBidderApp.controller('loginController', function($scope, $http, $location, UserService, $rootScope) {
    var vm = this;
    vm.email;
    vm.password;

    vm.errors = false;
    vm.message;

    //these are functions that we can use in our html
    vm.login = function() {
        if(!vm.email || !vm.password) {
            vm.message = 'All fields are required';
            vm.errors = true;
        } else {
            firebase.auth().signInWithEmailAndPassword(vm.email, vm.password)
            .then(function(user){
                UserService.setUser(user);
                $rootScope.$apply(function() {
                    $location.path('/home');
                });
            })
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                vm.message = errorMessage;
                vm.errors = true;
            });

        }
    };
});