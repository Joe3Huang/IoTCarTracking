<?php
return [
    'default' => 'lumenapidb',
    'connections' => [
        'lumenapidb' => [
            'driver'    => env('DB_DRIVER', 'mysql'),
            'host'      => env('DB_HOST', 'localhost'),
            'port'      => env('DB_PORT', '3306'),
            'database'  => env('DB_DATABASE', 'lumenapidb'),
            'username'  => env('DB_USERNAME', 'homestead'),
            'password'  => env('DB_PASSWORD', 'secret'),
            'options' => [PDO::ATTR_EMULATE_PREPARES => true],
            'charset'   => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix'    => '',
            'strict'    => false,
            'unix_socket' => '/var/run/mysqld/mysqld.sock'
        ]
    ],
];