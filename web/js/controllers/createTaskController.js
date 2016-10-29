burdenBidderApp.controller('createTaskController', function($scope, $http, $location, UserService, $rootScope) {

    //check for auth
    angular.element(document).ready(function () {
        if(!UserService.getUser()) {
            $rootScope.$apply(function () {
                $location.path('/');
            });
        }
    });

    $scope.title;
    $scope.description;
    $scope.category;
    $scope.openingPrice;
    $scope.imageUpload;
    $scope.imageData;

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

    };

});