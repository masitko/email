
angular.module('gifs').factory('Gifs', ['$resource',
    function($resource) {
        return $resource('api/gifs/:gifId', {
            gifId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]);