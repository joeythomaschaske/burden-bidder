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
    vm.editPic = false;
    vm.edit = function(){
        vm.editForm = true;
        vm.editPic = true;
    };


    var handleFileSelect = function(evt) {
        var files = evt.target.files;
        var file = files[0];

        if (files && file) {
            var reader = new FileReader();

            reader.onload = function(readerEvt) {
                var binaryString = readerEvt.target.result;
                vm.user.picture = btoa(binaryString);
            };

            reader.readAsBinaryString(file);
        }
    };

    if (window.File && window.FileReader && window.FileList && window.Blob) {
        $('#picture')[0].addEventListener('change', handleFileSelect, false);
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }

    vm.save = function(){
        vm.editForm = false;
        vm.editPic = false;
        //Data setup
        var userIdKey = UserService.getUser().uid;
        var newData = {
            picture: vm.user.picture,
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
            url: 'https://www.burdenbidderbacken.herokuapp.com/create',
            data: newData
        }).then(function (response) {
        }).catch(function(error){
            console.log(error);
        });
    };

    var data = {
        userId : UserService.getUser().uid
    };

    //getting tasks
    $http({
        method: 'POST',
        url: 'https://www.burdenbidderbacken.herokuapp.com/getAccount',
        data : data
    }).then(function(response) {
        vm.user = response.data;
        console.log('Getting account');
        console.log(response.data);
    }).catch(function(error){
        console.log(error);
    });

});
