<?php
namespace MyApp;
use Ramsey\Uuid\Uuid;
use Ramsey\Uuid\Exception\UnsatisfiedDependencyException;
Class Methods {
    public static function curlGet($path) {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
           //  CURLOPT_URL => 'localhost/RestApi',
            CURLOPT_URL => $path,
            CURLOPT_USERAGENT => 'Test',
            CURLOPT_HEADER => 1
        ));
        $resp = curl_exec($curl);
        $header_size = curl_getinfo($curl, CURLINFO_HEADER_SIZE);
        // $header = substr($resp, 0, $header_size);
        $body = substr($resp, $header_size);
        curl_close($curl);
        return json_decode($body);
    }

    public static function curlPost($url, $data) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        $response = curl_exec($ch);
        if (curl_error($ch)) {
            throw new \Exception(curl_error($ch));
        }
        curl_close($ch);
        return json_decode($response);
    }

    public static function uuid() {
        try {
            // Generate a version 1 (time-based) UUID object
            $uuid1 = Uuid::uuid1();
            return $uuid1->toString(); // i.e. e4eaaaf2-d142-11e1-b3e4-080027620cdd
        
        } catch (UnsatisfiedDependencyException $e) {
        
            // Some dependency was not met. Either the method cannot be called on a
            // 32-bit system, or it can, but it relies on Moontoast\Math to be present.
            echo 'Caught exception: ' . $e->getMessage() . "\n";
        
        }
    }

}
