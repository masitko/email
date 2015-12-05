angular.module('gifs').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
                when('/gifs', {
                    templateUrl: 'gifs/views/list-gifs.client.view.html'
                }).
                when('/gifs/create', {
                    templateUrl: 'gifs/views/form-gif.client.view.html'
                }).
                when('/gifs/:gifId', {
                    templateUrl: 'gifs/views/view-gif.client.view.html'
                }).
                when('/gifs/:gifId/edit', {
                    templateUrl: 'gifs/views/form-gif.client.view.html'
                });
    }
]);