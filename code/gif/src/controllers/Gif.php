<?php

namespace gif\controllers;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use GuzzleHttp\Client;
use \gif\services\Counter;

 
class Gif {
    
    CONST     TYPE_COUNTER = "counter";
    
    protected $guzzleClient;
    protected $counter;
    protected $gif;
    
    function __construct( Client $guzzleClient, Counter $counter ) {
        $this->guzzleClient = $guzzleClient;
        $this->counter = $counter;
    }
    
    function getGif(Request $request, $id = null) {
        
        $response = '';
        try {
            $this->gif = $this->guzzleClient->get('http://localhost:8019/api/gifs/'.$id)->json();
        } catch(\GuzzleHttp\Exception\ConnectException $e ) {
            return $this->errorResponse("Cannot retrieve gif info.");
        }

//        var_dump($this->gif['options']['timerEnd']);
//        die();
        switch( $this->gif['type'] ) {
            case self::TYPE_COUNTER:
                $response = $this->counter->get( $this->gif, $this->gif['options'] );
                break;
            default:
                break;
        }
        
        return new Response(
            $response,
            200,
            array(
                'Content-Type' => 'image/gif',
            )
        );
    }
    
    function getGif64(Request $request) {
        
        $response = '';
        
        $this->gif = (array)json_decode($request->getContent());
        
        switch( $this->gif['type'] ) {
            case self::TYPE_COUNTER:                
                $response = $this->counter->get( $this->gif, (array)$this->gif['options'] );
                break;
            default:
                break;
        }
        
        return new Response(
//              var_dump($this->gif),
            base64_encode($response),
            200,
            array(
//                'Content-Type' => 'image/gif',
                'Content-Type' => 'text',
                'Access-Control-Allow-Origin' => '*',
                'Access-Control-Allow-Headers' => 'Content-Type'
            )
        );
    }
    
    private function errorResponse( $message, $status = 404 ) {
        return new Response(
            $message,
            $status
        );
        
    }
    
}
