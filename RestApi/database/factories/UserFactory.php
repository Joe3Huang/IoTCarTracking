<?php

$factory->define(App\User::class, function(Faker\Generator $faker){
	return [
		'uid'=> str_random(32),
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