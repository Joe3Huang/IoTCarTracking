<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/test', function () {
	// echo base_path() . '/n';
    // echo 'hello';
    return view('email.reset_password', ['inputs' => ['token' => '1235243676877709ewrwtyuyiu']]);
});

$router->get('/', function () {
	if(DB::connection()->getDatabaseName())
	{
	    echo "conncted sucessfully to database ".DB::connection()->getDatabaseName();
	}
	try {
		DB::connection()->getPdo();
	} catch (\Exception $e) {
		die("Could not connect to the database.  Please check your configuration.");
	}
    return App::VERSION();
});

Route::post('accessToken', 'AccessTokenController@createAccessToken');

Route::post('registerUser', 'UserController@registerUser');

Route::get('registerUserViaEmail/{unique_code}', 'UserController@confirmRegistration');

Route::post('resetPassword', 'UserController@passwordReset');

Route::get('resetPassword/{token}', 'UserController@passwordResetPage');

Route::post('resetPasswordViaEmail', 'UserController@confirmResetPassword');

Route::group(['middleware' => ['auth:api']], function () use ($router) {
    $router->get('users', 'UserController@show');

	$router->get('userInfo', 'UserController@getCurrentUserInfo');

});

Route::group(['middleware' => ['auth:api'], 'prefix' => 'device'], function () use ($router) {
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
Route::group(['middleware' => ['cors'], 'prefix' => 'device'], function () use ($router) {
	
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


// Route::get('/mail/queue', function () use ($router) {
// 	Mail::later(5, 'email.register', ['name'=> 'Joe'], function($messsage) {
// 		$messsage->to('joe3huang@gmail.com', 'Laravel email testing')->subject('Welcome');
// 	});
// 	// Mail::send('email.register', ['name'=> 'Joe'], function($messsage) {
// 	// 	$messsage->to('joe3huang@gmail.com', 'Laravel email testing')->subject('Welcome');
// 	// });
// 	return 'Thee email will be sent after few seconds.';
// });