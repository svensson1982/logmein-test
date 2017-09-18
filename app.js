var bookApp = angular.module('bookApp', ['ngResource', 'ngRoute', 'ngStorage']);

bookApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {templateUrl: 'templates/book-list.html', controller: 'BookListCtrl'})
        .when('/details', {templateUrl: 'templates/details.html', controller: 'BookDetailsCtrl'});
    // use the HTML5 History API
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
}]);

