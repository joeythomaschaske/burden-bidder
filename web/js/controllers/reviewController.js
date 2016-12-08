burdenBidderApp.controller('reviewController', function($scope, $http, $location, $routeParams) {
    var vm = this;

    vm.createReview = function() {
        var data = {
            description : vm.description,
            rating : vm.rating,
            relatedTo : $routeParams.Id,
            title : vm.title
        };

        $http({
            method: 'POST',
            url: 'http://localHost:8080/createReview',
            data : data
        }).then(function(response) {
            alert('Review Created!');
            $rootScope.$apply(function () {
                $location.path('/home');
            });
        }).catch(function(error){
            console.log(error);
        });
    };

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