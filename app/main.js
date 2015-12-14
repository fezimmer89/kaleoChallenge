'use strict';

angular.module('kaleoProject', [
        'ui.bootstrap',
        'ui.router',
        'selectize'
    ])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $stateProvider.state({
            name: 'default',
            url: '/',
            templateUrl: 'app/partials/search.html'
        });
        $stateProvider.state({
            name: '404',
            url: '/404',
            templateUrl: 'app/partials/404.html'
        });

        $urlRouterProvider
            .when('/', 'default')
            .otherwise('404');
    }])
    .run(['$state', '$rootScope', function($state, $rootScope) {
        $state.transitionTo('default');
    }])
    .controller('mainCtrl', ['$scope', '$location',
        function($scope, $location) {
            $scope.getClass = function(path) {
                if ($location.path().substr(0, path.length) === path) {
                    return 'active';
                } else {
                    return '';
                }
            };
        }
    ]);
