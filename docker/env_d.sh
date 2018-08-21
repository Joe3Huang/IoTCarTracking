#!/bin/bash
export APP_NAME='Laravel'
export APP_ENV='local'
export APP_KEY='base64:M3bfaZffFGRn8SCPt3eFIGIJeWxOaNRQyCePWq00+nQ='
export APP_DEBUG='true'
export APP_STORAGE=/var/www/html/RestApi/storage
export APP_URL=http://192.168.99.100:8080/RestApi

export LOG_CHANNEL=stack

export DB_CONNECTION=mysql
export DB_HOST=192.168.99.100
export DB_PORT=3306
export DB_DATABASE=homestead
export DB_USERNAME=homestead
export DB_PASSWORD=secret

export BROADCAST_DRIVER=log
export CACHE_DRIVER=file
export SESSION_DRIVER=file
export SESSION_LIFETIME=120
export QUEUE_DRIVER=database

export MAIL_DRIVER=smtp
export MAIL_HOST=108.177.125.109
#smtp.gmail.com
export MAIL_PORT=587
export MAIL_USERNAME=joehuangcoding@gmail.com
export MAIL_PASSWORD=yvqvuekvdyzrlqnq
export MAIL_FROM_ADDRESS=joehuangcoding@gmail.com
export MAIL_FROM_NAME="IoT Car Tracking"
export MAIL_ENCRYPTION=tls

echo 'hello'
