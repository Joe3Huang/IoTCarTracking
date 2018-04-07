<?php
namespace MyApp;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Predis\Client as PredisClient;

class Chat implements MessageComponentInterface {
    protected $clients;

    protected $callback;

    protected $redisClient;

    public function __construct($stopCallback) {
        $this->clients = new \SplObjectStorage;
        $this->callback = $stopCallback;
    //     var_dump($this->redisClient);
    //     try {
    //         $this->redisClient = new PredisClient([
    //             'scheme' => 'tcp',
    //             'host'   => '192.168.99.100',
    //             'port'   => 6379,
    //         ]);
           
    //     }
    //     catch (Exception $e) {
    //         die($e->getMessage());
    //     }

    }

    public function onOpen(ConnectionInterface $conn) {
        // Store the new connection to send messages to later
        $theClient = new UserConnection($conn);
        // print_r(serialize(var_dump($conn)));
       // $testVar = serialize(var_dump($theClient));
      //  $this->redisClient->set($conn->resourceId, $testVar);
        $this->clients->attach($theClient);
        echo "New connection! ({$conn->resourceId})\n";
        //  foreach ($this->clients as $client) {
        //     echo $client->conn->resourceId . '\n';
        // }
        echo "SplObjectStorage nums of Obj ({$this->clients->count()})\n";
      // var_dump($theClient);     
       //$this->redisClient->set('foo', 'bar');
      //  $value = $this->redisClient->get($conn->resourceId);
      //  echo 'Redis ------------' , PHP_EOL;
      //  echo $value , PHP_EOL;
      //  var_dump($value);
        //$redisConn = json_decode($value);
        //echo $redisConn->resourceId , PHP_EOL;
        
     //   $this->redisClient->set('foo', 'bar');
     //   $value = $this->redisClient->get('foo');
        // $this->redisClient->monitor(function($message) {
        //     // This function will be called on message and on timeout
        //     if (!isset($message)) {
        //         echo 'No any message for 10 second... exit'. PHP_EOL;
        //         // return <false> for stop monitoring and exit
        //         return false;
        //     }

        //     echo 'monitor', PHP_EOL;
        //     echo $message, PHP_EOL;
        //     // return <true> for to wait next message
        //     return true;
        // });
       //  echo "onOpen", PHP_EOL;
        echo '----------onOpen-------------', PHP_EOL;
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $data = json_decode($msg);
        switch ($data->command) {
            case 'AUTH':
                $device =  json_decode(Methods::get('localhost/RestApi/device/getDeviceByCode/'.$data->device_code));
                if ($device == "FAIL") {
                    $from->close();
                }
                if ($data->device_type == 'BROWSER_ADMIN') {
                    $from->send(json_encode(['command' => 'AUTH', 'message'=> 'OK']));                   
                } else if ($data->device_type == 'MOBILE_GPS') {
                    if ($device->device_code) {
                        $from->send(json_encode(['command' => 'AUTH', 'message'=> 'FAIL - the device has connected'])); 
                        $from->close();  
                    } else {
                        
                    }
                }
                break;
            case 'AUTH':
                if ($device !== "FAIL") {
                    $from->send(json_encode(['command' => 'AUTH', 'message'=> 'OK'])); 
                }
                break;
            
            default:
        }
       echo '-----------------------', PHP_EOL;
        $numRecv = count($this->clients) - 1;
        echo sprintf('Connection %d sending message "%s" to %d other connection%s' . "\n"
            , $from->resourceId, $msg, $numRecv, $numRecv == 1 ? '' : 's');
        // $from->send($from->resourceId.'-- : '. $msg);
        foreach ($this->clients as $client) {
            if ($from !== $client->conn) {
                // The sender is not the receiver, send to each client connected
                $client->conn->send(sprintf('Connection %d sending message "%s" to %d other connection%s' . "\n"
                , $from->resourceId, $msg, $numRecv, $numRecv == 1 ? '' : 's'));
            }
        }
        if($msg == 'stopServer'){
            call_user_func($this->callback);
        }
    }

    public function onClose(ConnectionInterface $conn) {
        // The connection is closed, remove it, as we can no longer send it messages
       $theClient =  $this->getTheUserConn($conn, $this->clients);
       if($theClient){
            $this->clients->detach($theClient);
       }
        echo "Connection {$conn->resourceId} has disconnected\n";

        echo "onClose--- nums of Obj ({$this->clients->count()})\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";
        $theClient =  $this->getTheUserConn($conn, $this->clients);
        if($theClient){
             $this->clients->detach($theClient);
        }
        $conn->close();
    }

    private function getTheUserConn(ConnectionInterface $con, $clients){
        foreach ($this->clients as $client) {
            if ($con === $client->conn) {
                return $client;
            }
        }
        return null;
    }
}