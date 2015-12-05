
angular.module('gifs').controller('GifsController', ['$scope', '$http',
    '$routeParams', '$location', 'Authentication', 'Gifs',
    function ($scope, $http, $routeParams, $location, Authentication, Gifs)
    {
        $scope.authentication = Authentication;

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.colorOptions = {
            position: 'bottom right',
            letterCase: 'uppercase'

        };

        $scope.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.init = function () {            
            if ($routeParams.gifId === undefined) {
                setTimerEnd( new Date());
                $scope.timeEnd.setHours(0, 0, 0, 0);
                $scope.gif = createNew();
            }
            else {
                $scope.gif = findOne();
            }
            console.log($scope.gif);
        };

        function findOne() {
            return Gifs.get({
                gifId: $routeParams.gifId
            }, function( gif ) {
                setTimerEnd( new Date(gif.options.timerEnd) );
            });
        };
        
        function createNew() {
            var options = {
                frames: 60,
                timerEnd: new Date()
            };
            options.timerEnd.setHours(0, 0, 0, 0);

            var gif = new Gifs({
                repeat: 0,
                delay: 1000,
                colour1: 'FF0000',
                backgroundColour: '0000FF',
                options: options

            });

            return gif;            
        }

        $scope.changed = function () {

            $scope.gif.options.timerEnd = getTimerEnd();
            console.log($scope.gif);

            $http.post('http://localhost:8018/g64', $scope.gif)
                    .success(function (data, status, headers, config) {
                        $scope.image = data;
                    });
        };

        function getTimerEnd() {
            var timerEnd = new Date($scope.dateEnd);
            timerEnd.setUTCHours($scope.timeEnd.getUTCHours(), $scope.timeEnd.getUTCMinutes());
            
            return timerEnd;
        }

        function setTimerEnd( date ) {
            $scope.dateEnd = new Date( date.getFullYear(), date.getMonth(), date.getDate() );
            $scope.timeEnd = new Date();
            $scope.timeEnd.setUTCHours(date.getUTCHours(), date.getUTCMinutes());
        }

        $scope.find = function () {
            $scope.gifs = Gifs.query();
        };
        
        $scope.findOne = function () {
            $scope.gif = findOne();
        };
        
        $scope.submit = function () {
            if( $scope.gif._id === undefined ) {
                create();
            } 
            else {
//                $scope.gif.markModified('options');
                update();
            }
        };
        
        function update() {
            $scope.gif.$update(function () {
                $location.path('gifs/' + $scope.gif._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        function create() {
            $scope.gif.options.timerEnd = getTimerEnd();
            $scope.gif.$save(function (response) {
                $location.path('gifs/' + response._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.delete = function (gif) {
            if (gif) {
                gif.$remove(function () {
                    for (var i in $scope.gifs) {
                        if ($scope.gifs[i] === gif) {
                            $scope.gifs.splice(i, 1);
                        }
                    }
                });
            } else {
                $scope.gif.$remove(function () {
                    $location.path('gifs');
                });
            }
        };                
    }
]);