<?php
namespace MyApp;
use Ratchet\ConnectionInterface;


class UserConnection{

    public $conn;

    public $userData = [
        'deviceId' => '',
        'bIsAuthorized' => '',
        'deviceOwnerId' => '',
        'deviceCode' => ''
    ];

    public function __construct(ConnectionInterface $con) {
        $this->conn = $con;

    }



}