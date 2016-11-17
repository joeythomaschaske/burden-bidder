/**
 * Created by Joseph on 10/19/16.
 */
var burdenBidderApp = angular.module('BurdenBidder', ['ngRoute', 'ngMap']);


burdenBidderApp.config(function($routeProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];


    $routeProvider
    .when('/', {
        templateUrl : 'landing.html',
        controller : 'landingController',
        controllerAs : 'vm'
    })
    .when('/signup', {
        templateUrl : 'signup.html',
        controller : 'signUpController',
        controllerAs : 'vm'
    })
    .when('/login', {
        templateUrl : 'login.html',
        controller : 'loginController',
        controllerAs : 'vm'
    })
    .when('/home', {
        templateUrl : 'home.html',
        controller : 'homeController',
        controllerAs : 'vm'
    })
    .when('/createTask', {
        templateUrl : 'createTask.html',
        controller : 'createTaskController',
        controllerAs : 'vm'
    })
    .when('/account', {
        templateUrl : 'account.html',
        controller : 'accountController',
        controllerAs : 'vm'
    })
    .when('/terms', {
        templateUrl : 'terms.html'
    })
    .when('/taskDetail/:Id', {
        templateUrl : 'taskDetail.html',
        controller : 'taskDetailController',
        controllerAs : 'vm'
    });
});
