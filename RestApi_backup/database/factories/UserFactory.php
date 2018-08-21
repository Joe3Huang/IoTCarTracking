<?php
// use App\Library\Services\UuidInterface;
//use App\Library\Services\UuidService;
use Ramsey\Uuid\Uuid;
$factory->define(App\User::class, function(Faker\Generator $faker){
	return [
		'uid'=> Uuid::uuid1()->toString(),
		'first_name'=>$faker->firstName,
		'last_name'=>$faker->lastName,
		'email'=>$faker->email,
		'password'=>\Illuminate\Support\Facades\Hash::make('pass'),
		'city'=>$faker->city,
		'status'=>rand(1, 0),
		'username'=>$faker->username,
		'role'=>$faker->randomElement(['BASIC_USER','ADMIN_USER']),
		'isActive'=>rand(0,1)
	];
});

// $factory->define(App\Device::class, function(Faker\Generator $faker){
// 	return [
// 		'uid'=> factory(App\User::class)->create()->uid,
// 		'device_type'=>$faker->randomElement(['BROWSER_ADMIN']),
// 		'name'=>$faker->name,
// 		'owner_uid'=> '',
// 		'isExpired'=>$faker->boolean($chanceOfGettingTrue = 50),
// 		'random_link_ucode'=> '',
// 		'status'=>$faker->randomElement(['CONNECTED','UNCONNECTED']),
// 		'expires_date'=>$faker->dateTime($max = 'now', $timezone = null)
// 	];
// });