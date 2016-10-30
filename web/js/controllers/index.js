/**
 * Created by Joseph on 10/19/16.
 */
var burdenBidderApp = angular.module('BurdenBidder', ['ngRoute']);


burdenBidderApp.config(function($routeProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];


    $routeProvider
    .when('/', {
        templateUrl : 'landing.html',
        controller : 'landingController'
    })
    .when('/signup', {
        templateUrl : 'signup.html',
        controller : 'signUpController'
    })
    .when('/login', {
        templateUrl : 'login.html',
        controller : 'loginController'
    })
    .when('/home', {
        templateUrl : 'home.html',
        controller : 'homeController'
    })
    .when('/createTask', {
        templateUrl : 'createTask.html',
        controller : 'createTaskController'
    })
    .when('/account', {
        templateUrl : 'account.html',
        controller : 'accountController'
    });

});
