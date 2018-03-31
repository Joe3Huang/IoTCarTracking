<?php
use Laravel\Lumen\Routing\Router;
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});


// $router->group(['middleware' => ['corss']], function () use ($router) {
// 	$router->get('/test', function () use ($router) {
// 		return "Hello World123";
// 	});
// });
$router->get('/test', function () use ($router) {
	return "Hello World123";
});
// route for creating access_token
$router->post('accessToken', 'AccessTokenController@createAccessToken');


$router->group(['middleware' => ['auth:api']], function () use ($router) {
    $router->get('users',  [
        'uses' => 'UserController@show'
	]);

	$router->get('userInfo',  [
        'uses' => 'DeviceController@getCurrentUserInfo'
	]);

});

$router->group(['middleware' => ['auth:api'], 'prefix' => 'device'], function () use ($router) {
	
	$router->get('userDevices',  [
        'uses' => 'DeviceController@getAllTheDevices'
	]);

});

// reset device stutes and clean random_link_code
// @params device uid
$router->group(['middleware' => ['cors'], 'prefix' => 'device'], function () use ($router) {
	
	$router->post('resetDevice',  [
		'uses' => 'DeviceController@resetTheDevice'
	]);

});


//$router->post('/oauth/token', '\Laravel\Passport\Http\Controllers\AccessTokenController@issueToken');

 // $api = app('Dingo\Api\Routing\Router');

 // $api->version('v1', function($api){
 // 	$api->group(['prefix'=>'oauth'], function($api){
	// 	$api->post('token', '\Laravel\Passport\Http\Controllers\AccessTokenController@issueToken');
	// });

	// // $api->group(['namespace'=>'App\Http\Controllers', 'middleware'=>['auth:api', 'cors']], function($api){

	// // 	// controller route
	// // 	$api->get('users', 'UserController@show');
	// // });

 // });