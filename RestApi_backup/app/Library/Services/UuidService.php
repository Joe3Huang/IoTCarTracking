<?php

namespace App\Library\Services;
  
use App\Library\Services\UuidInterface;
use Ramsey\Uuid\Uuid;
use Ramsey\Uuid\Exception\UnsatisfiedDependencyException; 
class UuidService implements UuidInterface
{
    public function getUuid()
    {
        try {

            // Generate a version 1 (time-based) UUID object
            $uuid1 = Uuid::uuid1();
            return $uuid1->toString();// . "\n"; // i.e. e4eaaaf2-d142-11e1-b3e4-080027620cdd
        
            // Generate a version 3 (name-based and hashed with MD5) UUID object
            //$uuid3 = Uuid::uuid3(Uuid::NAMESPACE_DNS, 'php.net');
            //echo $uuid3->toString() . "\n"; // i.e. 11a38b9a-b3da-360f-9353-a5a725514269
        
            // Generate a version 4 (random) UUID object
            //$uuid4 = Uuid::uuid4();
            //echo $uuid4->toString() . "\n"; // i.e. 25769c6c-d34d-4bfe-ba98-e0ee856f3e7a
        
            // Generate a version 5 (name-based and hashed with SHA1) UUID object
           // $uuid5 = Uuid::uuid5(Uuid::NAMESPACE_DNS, 'php.net');
            //echo $uuid5->toString() . "\n"; // i.e. c4a760a8-dbcf-5254-a0d9-6a4474bd1b62
        
        } catch (UnsatisfiedDependencyException $e) {
        
            // Some dependency was not met. Either the method cannot be called on a
            // 32-bit system, or it can, but it relies on Moontoast\Math to be present.
            echo 'Caught exception: ' . $e->getMessage() . "\n";
        
        }
    }
}