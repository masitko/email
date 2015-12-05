<?php

namespace gif\services;

use \gif\services\GifEncoder;

class Counter {

    protected $gifEncoder;

    function __construct(GifEncoder $gifEncoder) {
        $this->gifEncoder = $gifEncoder;
    }

    function get( $gif, $options ) {

//        var_dump($gif);
//        $future_date = new \DateTime(date('r', strtotime($time)));
        $future_date = new \DateTime($options['timerEnd']);
//        var_dump($time);
//        var_dump($future_date);
//        die();
        $time_now = time();
        $now = new \DateTime(date('r', $time_now));

        $frames = array();
        $delays = array();

        if ($hex) {
            $hex = strtoupper($hex);
            $red = hexdec(substr($hex, 0, 2));
            $blue = hexdec(substr($hex, 2, 2));
            $green = hexdec(substr($hex, 4, 2));
        }

        
        $background = __DIR__.'/../../assets/img/contdown-blue.png';

        $image = imagecreatefrompng($background);
//var_dump($image);
        $delay = 100; // milliseconds
        $font = array(
            'size' => 40,
            'angle' => 0,
            'x-offset' => 10,
            'y-offset' => 60,
            'file' => __DIR__.'/../../assets/font/DigitalDream.ttf',
            'color' => imagecolorallocate($image, $red, $green, $blue),
        );

        for ($i = 0; $i <= 60; $i++) {
            $interval = date_diff($future_date, $now);
            if ($future_date < $now) {
                // Open the first source image and add the text.
                $image = imagecreatefrompng($background);
                $colour = imagecolorallocate($image, $red, $green, $blue);
                $text = $interval->format('00:00:00:00');
                imagettftext($image, $font['size'], $font['angle'], $font['x-offset'], $font['y-offset'], $colour, $font['file'], $text);
                ob_start();
                imagegif($image);
                $frames[] = ob_get_contents();
                $delays[] = $delay;
                $loops = 1;
                ob_end_clean();
                break;
            } else {
                // Open the first source image and add the text.
                $image = imagecreatefrompng($background);
                $colour = imagecolorallocate($image, $red, $green, $blue);

//                var_dump($image);
                $text = $interval->format('%a:%H:%I:%S');
                // %a is weird in that it doesn’t give you a two digit number
                // check if it starts with a single digit 0-9
                // and prepend a 0 if it does
                if (preg_match('/^[0-9]\:/', $text)) {
                    $text = '0' . $text;
                }
                imagettftext($image, $font['size'], $font['angle'], $font['x-offset'], $font['y-offset'], $colour, $font['file'], $text);
                ob_start();
                imagegif($image);
                $frames[] = ob_get_contents();
                $delays[] = $delay;
                $loops = 0;
                ob_end_clean();
            }
            $now->modify('+1 second');
        }
        
        $this->gifEncoder->create($frames, $delays, $loops);
        
        return $this->gifEncoder->getAnimation();
    }

}

//date_default_timezone_set('Europe/London');
//$time = $_GET['time'];
//$hex = $_GET['hex'];
//$time = "2015-04-18";
//expire this image instantly
//header('Expires: Sat, 26 Jul 1997 05:00:00 GMT');
//header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
//header('Cache-Control: no-store, no-cache, must-revalidate');
//header('Cache-Control: post-check=0, pre-check=0', false);
//header('Pragma: no-cache');
//$gif = new AnimatedGif($frames, $delays, $loops);
//$gif->display();
