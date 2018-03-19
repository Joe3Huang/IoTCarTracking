<?php
namespace MyApp;
use Ratchet\ConnectionInterface;


class UserConnection{

    public $conn;

    public $userData;

    public function __construct(ConnectionInterface $con) {
        $this->conn = $con;

    }



}