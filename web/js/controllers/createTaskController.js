burdenBidderApp.controller('createTaskController', function($scope, $http, $location, UserService, $rootScope) {

    var vm = this;
    angular.element(document).ready(function () {
        if(!firebase.auth().currentUser) {
            $rootScope.$apply(function () {
                $location.path('/');
            });
        }
    });

    vm.errors = false;
    vm.message;

    vm.title;
    vm.description;
    vm.category;
    vm.openingPrice;
    vm.imageUpload;
    vm.imageData;

    vm.categories = [
        {id: 0, name: '', value: 'empty'},
        {id: 1, name: 'Delivery', value: 'Delivery'},
        {id: 2, name: 'Cleaning', value: 'Cleaning'},
        {id: 3, name: 'Heavy Lifting', value: 'Heavy Lifting'},
        {id: 4, name: 'Errands', value: 'Errands'},
        {id: 5, name: 'Pet Sitting', value: 'Pet Sitting'},
        {id: 6, name: 'Computer Help', value: 'Computer Help'},
        {id: 7, name: 'Furniture Assembly', value: 'Furniture Assembly'},
        {id: 7, name: 'Yard Work', value: 'Yard Work'}
    ];

    var lat;
    var long;
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(handleLocation);
    } else {
        alert('Location not supported');
    }

    function handleLocation(location) {
        lat = location.coords.latitude;
        long = location.coords.longitude;
        console.log(location);
        console.log(lat);
        console.log(long);
    }

    var handleFileSelect = function(evt) {
        var files = evt.target.files;
        var file = files[0];

        if (files && file) {
            var reader = new FileReader();

            reader.onload = function(readerEvt) {
                var binaryString = readerEvt.target.result;
                vm.imageData = btoa(binaryString);
            };

            reader.readAsBinaryString(file);
        }
    };

    if (window.File && window.FileReader && window.FileList && window.Blob) {
        $('#image')[0].addEventListener('change', handleFileSelect, false);
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }


    vm.createTask = function() {
        console.log(vm.title);
        console.log(vm.description);
        console.log(vm.category);
        console.log(vm.openingPrice);
        console.log(vm.imageData);

        if(!vm.title || !vm.description || !vm.category || !vm.openingPrice ||
            !vm.imageData) {
            vm.errors = true;
            vm.message = 'All fields are required';

        } else if(!lat || !long) {
            vm.errors = true;
            vm.message = 'Location is required to post tasks';
        } else {
            vm.errors = false;

            var data = {
                title : vm.title,
                description : vm.description,
                category :vm.category,
                openingPrice : vm.openingPrice,
                currentBid : vm.openingPrice,
                imageUpload : vm.imageData,
                taskCreatorId : UserService.getUser().uid,
                lat : lat,
                long : long
            };

            console.log(data);

            $http({
                method: 'POST',
                url: 'burdenbidder.appspot.com/createTask',
                data: data
            }).then(function(response) {
                setTimeout(function(){
                    $rootScope.$apply(function() {
                        $location.path('/home');
                    });
                }, 3000);
            }).catch(function(error){
                console.log('ERROR!');
                console.log(error);
            });
        }
    };

});