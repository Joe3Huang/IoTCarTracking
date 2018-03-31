<?php
namespace MyApp;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

//require 'Predis/Autoloader.php';

//Predis\Autoloader::register();
use Predis\Client as PredisClient;

class Chat implements MessageComponentInterface {
    protected $clients;

    protected $callback;

    protected $redisClient;

    public function __construct($stopCallback) {
        $this->clients = new \SplObjectStorage;
        $this->callback = $stopCallback;


    //     var_dump($this->redisClient);

        try {
            $this->redisClient = new PredisClient([
                'scheme' => 'tcp',
                'host'   => '192.168.99.100',
                'port'   => 6379,
            ]);
           
        }
        catch (Exception $e) {
            die($e->getMessage());
        }

    }

    public function onOpen(ConnectionInterface $conn) {
        // Store the new connection to send messages to later
        $theClient = new UserConnection($conn);

        $this->clients->attach($theClient);

        echo "New connection! ({$conn->resourceId})\n";

        //  foreach ($this->clients as $client) {
        //     echo $client->conn->resourceId . '\n';
        // }

        echo "SplObjectStorage nums of Obj ({$this->clients->count()})\n";




       $this->redisClient->set('foo', 'bar');
        $value = $this->redisClient->get('foo');
        echo 'Redis ------------' , PHP_EOL;
        echo $value , PHP_EOL;

        
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
    
    }

    public function onMessage(ConnectionInterface $from, $msg) {

        // $curl = curl_init();
        // curl_setopt_array($curl, array(
        //     CURLOPT_RETURNTRANSFER => 1,
        //     CURLOPT_URL => 'localhost/RestApi',
        //     CURLOPT_USERAGENT => 'Test'
        // ));
        // $resp = curl_exec($curl);
        // echo $resp;
        // var_dump($resp);
        // curl_close($curl);

        $numRecv = count($this->clients) - 1;
        echo sprintf('Connection %d sending message "%s" to %d other connection%s' . "\n"
            , $from->resourceId, $msg, $numRecv, $numRecv == 1 ? '' : 's');
        $from->send($from->resourceId.'-- : '. $msg);
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