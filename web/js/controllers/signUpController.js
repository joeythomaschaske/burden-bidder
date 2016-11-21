burdenBidderApp.controller('signUpController', function($scope, $http, $location, UserService, $rootScope) {
    //scope are out variables that we use to communicate with the html
    var vm = this;
    vm.formOne = true;
    vm.errors = false;
    vm.message;

    vm.firstName;
    vm.lastName;
    vm.email;
    vm.password;
    vm.confirmPass;
    vm.agreeToTerms;

    vm.dateOfBirth;
    vm.phoneNo;
    vm.street;
    vm.city;
    vm.stateCode;
    vm.zip;

    vm.states = [
        {id: 0, name: '', value: 'Empty'},
        {id: 1, name: 'Alabama', value: 'Alabama'},
        {id: 2, name: 'Alaska' , value: 'Alaska'},
        {id: 3, name: 'Arizona', value: 'Arizona'},
        {id: 4, name: 'Arkansas', value: 'Arkansas'},
        {id: 5, name: 'California', value: 'California'},
        {id: 6, name: 'Colorado', value: 'Colorado'},
        {id: 7, name: 'Connecticut', value: 'Connecticut'},
        {id: 8, name: 'Delaware', value: 'Delaware'},
        {id: 9, name: 'Florida', value: 'Florida'},
        {id: 10, name: 'Georgia', value: 'Georgia'},
        {id: 11, name: 'Hawaii', value: 'Hawaii'},
        {id: 12, name: 'Idaho', value: 'Idaho'},
        {id: 13, name: 'Illinois', value: 'Illinois'},
        {id: 14, name: 'Indiana', value: 'Indiana'},
        {id: 15, name: 'Iowa', value: 'Iowa'},
        {id: 16, name: 'Kansas', value: 'Kansas'},
        {id: 17, name: 'Kentucky', value: 'Kentucky'},
        {id: 18, name: 'Louisiana', value: 'Louisiana'},
        {id: 19, name: 'Maine', value: 'Maine'},
        {id: 20, name: 'Maryland', value: 'Maryland'},
        {id: 21, name: 'Massachusetts', value: 'Massachusetts'},
        {id: 22, name: 'Michigan', value: 'Michigan'},
        {id: 23, name: 'Minnesota', value: 'Minnesota'},
        {id: 24, name: 'Mississippi', value: 'Mississippi'},
        {id: 25, name: 'Missouri', value: 'Missouri'},
        {id: 26, name: 'Montana', value: 'Montana'},
        {id: 27, name: 'Nebraska', value: 'Nebraska'},
        {id: 28, name: 'Nevada', value: 'Nevada'},
        {id: 29, name: 'New Hampshire', value: 'New Hampshire'},
        {id: 30, name: 'New Jersey', value: 'New Jersey'},
        {id: 31, name: 'New Mexico', value: 'New Mexico'},
        {id: 32, name: 'New York', value: 'New York'},
        {id: 33, name: 'North Carolina', value: 'North Carolina'},
        {id: 34, name: 'North Dakota', value: 'North Dakota'},
        {id: 35, name: 'Ohio', value: 'Ohio'},
        {id: 36, name: 'Oklahoma', value: 'Oklahoma'},
        {id: 37, name: 'Oregon', value: 'Oregon'},
        {id: 38, name: 'Pennsylvania', value: 'Pennsylvania'},
        {id: 39, name: 'Rhode Island', value: 'Rhode Island'},
        {id: 40, name: 'South Carolina', value: 'South Carolina'},
        {id: 41, name: 'South Dakota', value: 'South Dakota'},
        {id: 42, name: 'Tennessee', value: 'Tennessee'},
        {id: 43, name: 'Texas', value: 'Texas'},
        {id: 44, name: 'Utah', value: 'Utah'},
        {id: 45, name: 'Vermont', value: 'Vermont'},
        {id: 46, name: 'Virginia', value: 'Virginia'},
        {id: 47, name: 'Washington', value: 'Washington'},
        {id: 48, name: 'West Virginia', value: 'West Virginia'},
        {id: 49, name: 'Wisconsin', value: 'Wisconsin'},
        {id: 50, name: 'Wyoming', value: 'Wyoming'}
    ];

    vm.next = function() {
        if(!vm.firstName || !vm.lastName || !vm.email || !vm.password || !vm.confirmPass || !vm.agreeToTerms) {
            vm.errors = true;
            vm.message = 'All fields are required';
        } else if (vm.password !== vm.confirmPass) {
            vm.errors = true;
            vm.message = 'Passwords must match';
        } else {
            vm.errors = false;
            vm.formOne = !vm.formOne;
        }
    };

    vm.prev = function() {
        vm.formOne = !vm.formOne;
    };

    vm.finish = function() {
        if(!vm.dateOfBirth || !vm.phoneNo || !vm.street || !vm.city || !vm.stateCode || !vm.zip) {
            vm.errors = true;
            vm.message = 'All fields are required';
        } else {
            vm.errors = false;
            register();
            setTimeout(function(){
                $rootScope.$apply(function() {
                    $location.path('/home');
                });
            }, 3000);
        }
    };

    function register() {
        firebase.auth().createUserWithEmailAndPassword(vm.email, vm.password)
        .then(function (user) {
            console.log(user);
            UserService.setUser(user);
            createAccount();
        })
        .catch(function (error) {
            vm.message = error.message;
            alert(vm.message);
        });
    }
    //https://burdenbidderbacken.herokuapp.com
    function createAccount() {
        var data = {
            picture: "https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg",
            firstName : vm.firstName,
            lastName : vm.lastName,
            email : vm.email,
            dateOfBirth : vm.dateOfBirth,
            phoneNo : vm.phoneNo,
            street : vm.street,
            city : vm.city,
            stateCode: vm.stateCode,
            zip: vm.zip,
            userId: UserService.getUser().uid
        };

        console.log(data);

        $http({
            method: 'POST',
            url: 'https://burdenbidderbacken.herokuapp.com/create',
            data: data
        }).then(function(response) {

        }).catch(function(error){

        });
    }
});