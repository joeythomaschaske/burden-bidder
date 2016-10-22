/**
 * Created by Joseph on 10/19/16.
 */
var burdenBidderApp = angular.module('BurdenBidder', ['ngRoute']);

burdenBidderApp.config(function($routeProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];


    $routeProvider
    .when('/', {
        templateUrl : 'login.html',
        controller  : 'loginController'
    })
    .when('/signup', {
        templateUrl : 'signup.html',
        controller : 'signUpController'
    })

});
