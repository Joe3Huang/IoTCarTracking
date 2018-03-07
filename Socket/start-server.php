<?php

echo 'Start WsServer';
$output = shell_exec('php server.php');
echo $output;
echo "OK";
