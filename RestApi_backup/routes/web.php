<?php
use Laravel\Lumen\Routing\Router;
use Illuminate\Support\Facades\Mail;
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
	if(DB::connection()->getDatabaseName())
	{
	    echo "conncted sucessfully to database ".DB::connection()->getDatabaseName();
	}
	try {
		DB::connection()->getPdo();
	} catch (\Exception $e) {
		die("Could not connect to the database.  Please check your configuration.");
	}
    return $router->app->version();
});


$router->get('/test', function () use ($router) {
	return "Hello World123";
});

$router->get('/mail/queue', function () use ($router) {
	// Mail::later(5, 'email.register', ['name'=> 'Joe'], function($messsage) {
	// 	$messsage->to('joe3huang@gmail.com', 'Laravel email testing')->subject('Welcome');
	// });
	Mail::send('email.register', ['name'=> 'Joe'], function($messsage) {
		$messsage->to('joe3huang@gmail.com', 'Laravel email testing')->subject('Welcome');
	});
	return 'Thee email will be sent after few seconds.';
});

// route for creating access_token
$router->post('accessToken', 'AccessTokenController@createAccessToken');
$router->post('register', 'UserController@registerUser');


$router->post('test', function () use ($router) {
	return "test Hello World123";
});

$router->group(['middleware' => ['auth:api']], function () use ($router) {
    $router->get('users',  [
        'uses' => 'UserController@show'
	]);

	$router->get('userInfo',  [
        'uses' => 'UserController@getCurrentUserInfo'
	]);

});

$router->group(['middleware' => ['auth:api'], 'prefix' => 'device'], function () use ($router) {
	$router->get('userDevices',  [
        'uses' => 'DeviceController@getAllTheDevices'
	]);
	// @params user uid	
	// @params device uid	
	$router->post('linkDevice',  [
        'uses' => 'DeviceController@linkDeviceWithUser'
	]);
});

// reset device stutes and clean random_link_code
// @params device uid
$router->group(['middleware' => ['cors'], 'prefix' => 'device'], function () use ($router) {
	
	$router->post('resetDevice',  [
		'uses' => 'DeviceController@resetTheDevice'
	]);
	$router->get('getDeviceByCode/{device_code}',  [
        'uses' => 'DeviceController@getDeviceByCode'
	]);

	$router->post('updateDeviceDetails',  [
		'uses' => 'DeviceController@updateDeviceDetails'
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