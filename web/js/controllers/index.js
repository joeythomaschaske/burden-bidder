/**
 * Created by Joseph on 10/19/16.
 */
var burdenBidderApp = angular.module('BurdenBidder', ['ngRoute']);

burdenBidderApp.config(function($routeProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];


    $routeProvider
    .when('/', {
        templateUrl : 'signUp.html',
        controller  : 'signUpController'
    })

});
