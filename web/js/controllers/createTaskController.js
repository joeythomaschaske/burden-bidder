burdenBidderApp.controller('createTaskController', function($scope, $http, $location, UserService, $rootScope) {

    //check for auth
    angular.element(document).ready(function () {
        if(!firebase.auth().currentUser) {
            $rootScope.$apply(function () {
                $location.path('/');
            });
        }
    });

    $scope.errors = false;
    $scope.message;

    $scope.title;
    $scope.description;
    $scope.category;
    $scope.openingPrice;
    $scope.imageUpload;
    $scope.imageData;

    $scope.categories = [
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

    var handleFileSelect = function(evt) {
        var files = evt.target.files;
        var file = files[0];

        if (files && file) {
            var reader = new FileReader();

            reader.onload = function(readerEvt) {
                var binaryString = readerEvt.target.result;
                $scope.imageData = btoa(binaryString);
            };

            reader.readAsBinaryString(file);
        }
    };

    if (window.File && window.FileReader && window.FileList && window.Blob) {
        $('#image')[0].addEventListener('change', handleFileSelect, false);
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }


    $scope.createTask = function() {
        console.log($scope.title);
        console.log($scope.description);
        console.log($scope.category.value);
        console.log($scope.openingPrice);
        console.log($scope.imageData);

        if(!$scope.title || !$scope.description || !$scope.category || !$scope.openingPrice ||
            !$scope.imageData) {
            $scope.errors = true;
            $scope.message = 'All fields are required';
        } else {
            $scope.errors = false;

            var data = {
                title : $scope.title,
                description : $scope.description,
                category :$scope.category,
                openingPrice : $scope.openingPrice,
                currentBid : $scope.openingPrice,
                imageUpload : $scope.imageData,
                taskCreatorId : UserService.getUser().uid
            };

            console.log(data);

            $http({
                method: 'POST',
                url: 'http://localhost:8080/createTask',
                data: data
            }).then(function(response) {
                setTimeout(function(){
                    $rootScope.$apply(function() {
                        $location.path('/home');
                    });
                }, 3000);
            }).catch(function(error){
            });
        }
    };

});