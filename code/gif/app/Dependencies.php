<?php

namespace app;

use \gif\controllers;
use \gif\services;

use GuzzleHttp\Client;

class Dependencies {

    static function configure($app) {

        $app["controllers.gif"] = $app->share(function($app) {
            return new controllers\Gif($app["services.guzzle.client"], $app["services.counter"]);
        });        
        
        $app["services.guzzle.client"] = function() {
            return new Client();
        };

        $app["services.gif.encoder"] = function() {
            return new services\GifEncoder();
        };
        $app["services.counter"] = function($app) {
            return new services\Counter($app["services.gif.encoder"]);
        };

    }

}
