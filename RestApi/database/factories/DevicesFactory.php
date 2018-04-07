<?php

$factory->define(App\Device::class, function(Faker\Generator $faker){
	return [
		'uid'=> str_random(32),
		'device_type'=>$faker->randomElement(['MOBILE_GPS','BROWSER_ADMIN']),
		'name'=>$faker->name,
		'owner_uid'=> $faker->randomElement(['Tr3Fha63aFstN8iPxccAjWHrs4wOi02e','rRq06sLilYV8ZsBzEDdymVAyuSkcYMNn']),
		'isExpired'=>$faker->boolean($chanceOfGettingTrue = 50),
		'random_link_ucode'=>uniqid(),
		'status'=>$faker->randomElement(['CONNECTED','UNCONNECTED']),
		'expires_date'=>$faker->dateTime($max = 'now', $timezone = null)
	];
});