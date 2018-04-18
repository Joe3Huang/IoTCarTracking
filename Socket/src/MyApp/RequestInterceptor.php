<?php
namespace MyApp;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Http\HttpServerInterface;
use Guzzle\Common\Collection;
use Guzzle\Http\QueryString;

class RequestInterceptor implements \Ratchet\Http\HttpServerInterface {

    protected $clients;
    private $delegate;

    public function __construct(HttpServerInterface $delegate) {
        $this->delegate = $delegate;  
    }

    public function onOpen(ConnectionInterface $conn, \Guzzle\Http\Message\RequestInterface $request = null) {
        $this->delegate->onOpen($conn, $request);
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $this->delegate->onMessage($from, $msg);
    }

    public function onClose(ConnectionInterface $conn) {
        $this->delegate->onClose($conn);
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {

    }
}