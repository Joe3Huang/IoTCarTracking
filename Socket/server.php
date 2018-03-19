<?php

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use MyApp\Chat;
    require __DIR__ . '/vendor/autoload.php';

    $server = IoServer::factory(
        new HttpServer(
            new WsServer(
                new Chat('stopCallback')
            )
        ),
        34827,
        '127.0.0.1'
    );
    echo 'Start the WsSocket server';
    $server->run();

    function stopCallback() {
        global $server;
        $server->loop->stop();
        echo 'Stop WsSocket Server';
    }

