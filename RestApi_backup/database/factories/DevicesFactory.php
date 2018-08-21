<?php
use Ramsey\Uuid\Uuid;
use App\Repository\UserRepository;

$factory->define(App\Device::class, function(Faker\Generator $faker){
	$device_type = $faker->randomElement(['MOBILE_GPS','BROWSER_ADMIN']);
	$ower_id = '';
	$uid = Uuid::uuid1()->toString();
	if ($device_type == 'MOBILE_GPS') {
		$ower_id = factory(App\User::class)->make()->uid;	
	} 
	if ($device_type == 'BROWSER_ADMIN') {
		$uid = factory(App\User::class)->make()->uid;	
	}
	return [
		'uid'=> $uid,
		'device_type'=>$device_type,
		'name'=>$faker->name,
		'owner_uid'=> $ower_id,//$faker->randomElement(['26af421e-59a9-11e8-b993-80fa5b414213','269c2256-59a9-11e8-8816-80fa5b414213']),
		'isExpired'=>$faker->boolean($chanceOfGettingTrue = 50),
		'random_link_ucode'=>uniqid(),
		'status'=>$faker->randomElement(['CONNECTED','UNCONNECTED']),
		'expires_date'=>$faker->dateTime($max = 'now', $timezone = null)
	];
});