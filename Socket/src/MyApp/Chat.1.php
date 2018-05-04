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

       // var_dump($conn->WebSocket->request);
       // echo '-----------onOpen----------------';
       // var_dump($conn->WebSocket->request->getHeaders());
       // echo '-----------onOpen----------------';
       // var_dump($conn->WebSocket->request->getHeader('Authorization'));
        $theClient = new UserConnection($conn);
        $this->clients->attach($theClient);
        echo "New connection! ({$conn->resourceId})\n";
        echo "SplObjectStorage nums of Obj ({$this->clients->count()})\n";
        echo '----------onOpen-------------', PHP_EOL;
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        echo $msg;
        $data = json_decode($msg);
        echo '----------onMessage-------------', PHP_EOL;
        // var_dump($data);
        if (!is_object($data) || !property_exists($data, 'device_code')) {
            return false;
        }
        $device = Methods::curlGet('localhost/RestApi/device/getDeviceByCode/' . $data->device_code);
        if ($device == "FAIL") {
            $from->send(json_encode(['command' => 'AUTH', 'message'=> 'FAIL']));
            return '';
        }
        $device = $device[0];
        $theClient = $this->getTheUserConn($from, $this->clients);
        $theClient->userData['deviceId'] = $device->uid;
        switch ($data->command) {
            case 'AUTH':
                $this->authorization($theClient, $device, $data);
                // if ($data->device_type == 'BROWSER_ADMIN') {
                //     $from->send(json_encode(['command' => 'AUTH', 'message'=> 'OK']));
                                  
                // } else if ($data->device_type == 'MOBILE_GPS') {
                //     if ($device->random_link_ucode) {
                //         if($device->random_link_ucode == $data->random_link_ucode) {
                //             $from->send(json_encode(['command' => 'AUTH', 'message'=> 'OK']));
                //         } else {
                //             $from->send(json_encode(['command' => 'AUTH', 'message'=> 'FAIL - the device has connected'])); 
                //             // $from->close();                            
                //         }
                //     } 
                //     else 
                //     {
                //         try{
                //             if (!$device->random_link_ucode) {
                //                 $device->random_link_ucode = Methods::uuid();
                //                 $resp = Methods::curlPost('localhost/RestApi/device/updateDeviceDetails/', $device);
                //                 if ( $resp == 'OK') {
                //                     $updatedDate = json_encode(['command' => 'AUTH', 'message'=> 'DEVICE-OK', 'data'=>$device]);
                //                     $from->send($updatedDate); 
                //                     $this->groupMessage($updatedDate, [$device->owner_uid]);
                //                 }
                //             }   
                //         } catch (exception $e){
                //             $from->send(json_encode(['command' => 'AUTH', 'message'=> 'fail to connect'])); 
                //         }
                //     }
                // }
                break;
            case 'MESSAGE':
                if($theClient->userData['bIsAuthorized']) {
                    if ($data->device_type == 'MOBILE_GPS') {
                        $this->groupMessage($msg, [$device->owner_uid]);
                    }                    
                }

                break;
            case 'HEARTBEAT':


            break;
            default:
        }
    //    echo '-----------------------', PHP_EOL;
    //     $numRecv = count($this->clients) - 1;
    //     echo sprintf('Connection %d sending message "%s" to %d other connection%s' . "\n"
    //         , $from->resourceId, $msg, $numRecv, $numRecv == 1 ? '' : 's');
    //     // $from->send($from->resourceId.'-- : '. $msg);
    //     foreach ($this->clients as $client) {
    //         if ($from !== $client->conn) {
    //             // The sender is not the receiver, send to each client connected
    //             $client->conn->send(sprintf('Connection %d sending message "%s" to %d other connection%s' . "\n"
    //             , $from->resourceId, $msg, $numRecv, $numRecv == 1 ? '' : 's'));
    //         }
    //     }
        // if($msg == 'stopServer'){
        //     call_user_func($this->callback);
        // }
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

    private function groupMessage(String $message, Array $deviceIds) {
        foreach ($this->clients as $client) {
            foreach ($deviceIds as $id) {
                if($client->userData['deviceId'] == $id) {
                    $client->conn->send($message);
                }
            }
        }
    }

    private function authorization ($theClient, $device, $data) {
        if ($data->device_type == 'BROWSER_ADMIN') {
            $this->browserUserAuthorization($theClient, $device, $data);         
        } else if ($data->device_type == 'MOBILE_GPS') {
            $this->deviceAuthorization($theClient, $device, $data);
        }
    }

    private function browserUserAuthorization($theClient, $device, $data) {
        $theClient->conn->send(json_encode(['command' => 'AUTH', 'message'=> 'OK']));
        $theClient->userData['bIsAuthorized'] = true;
    }

    private function deviceAuthorization($theClient, $device, $data) {
        if ($device->random_link_ucode) {
            if($device->random_link_ucode == $data->random_link_ucode) {
                $theClient->conn->send(json_encode(['command' => 'AUTH', 'message'=> 'OK']));
                $theClient->userData['bIsAuthorized'] = true;
            } else {
                $theClient->conn->send(json_encode(['command' => 'AUTH', 'message'=> 'FAIL - the device has connected']));
                $theClient->userData['bIsAuthorized'] = false; 
                // $from->close();                            
            }
        } 
        else 
        {
            try{
                if (!$device->random_link_ucode) {
                    $device->random_link_ucode = Methods::uuid();
                    $resp = Methods::curlPost('localhost/RestApi/device/updateDeviceDetails/', $device);
                    if ( $resp == 'OK') {
                        $updatedDate = json_encode(['command' => 'AUTH', 'message'=> 'DEVICE-OK', 'data'=>$device]);
                        $theClient->conn->send($updatedDate); 
                        $this->groupMessage($updatedDate, [$device->owner_uid]);
                        $theClient->userData['bIsAuthorized'] = true;
                    } else {
                        $theClient->userData['bIsAuthorized'] = true;
                    }
                }   
            } catch (exception $e){
                $ $theClient->conn->send(json_encode(['command' => 'AUTH', 'message'=> 'fail to connect']));
                $theClient->userData['bIsAuthorized'] = false; 
            }
        }
    }
    
}