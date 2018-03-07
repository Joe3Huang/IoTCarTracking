<?php
namespace MyApp;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Chat implements MessageComponentInterface {
    protected $clients;

    protected $callback;

    public function __construct($stopCallback) {
        $this->clients = new \SplObjectStorage;
        $this->callback = $stopCallback;
    }

    public function onOpen(ConnectionInterface $conn) {
        // Store the new connection to send messages to later

        $conn->isUser = 
        $this->clients->attach($conn);

        echo "New connection! ({$conn->resourceId})\n";

         foreach ($this->clients as $client) {
            echo $client->resourceId;
        }
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $numRecv = count($this->clients) - 1;
        echo sprintf('Connection %d sending message "%s" to %d other connection%s' . "\n"
            , $from->resourceId, $msg, $numRecv, $numRecv == 1 ? '' : 's');
        $from->send('OK');
        foreach ($this->clients as $client) {
            if ($from !== $client) {
                // The sender is not the receiver, send to each client connected
                $client->send($msg);
            }
        }
        if($msg == 'stopServer'){
            call_user_func($this->callback);
        }
    }

    public function onClose(ConnectionInterface $conn) {
        // The connection is closed, remove it, as we can no longer send it messages
        $this->clients->detach($conn);

        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }
}