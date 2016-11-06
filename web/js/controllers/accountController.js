burdenBidderApp.controller('accountController', function($scope, $http, $location, UserService, $rootScope) {

    //check for auth
    angular.element(document).ready(function () {
        if(!firebase.auth().currentUser) {
            $rootScope.$apply(function () {
                $location.path('/');
            });
        }
    });

    var data = {
        userId : UserService.getUser().uid
    };

    //getting tasks
    $http({
        method: 'POST',
        url: 'http://localHost:8080/getAccount',
        data : data
    }).then(function(response) {
        $scope.user = response.data;
        console.log(response);
    }).catch(function(error){
        console.log(error);
    });

});
