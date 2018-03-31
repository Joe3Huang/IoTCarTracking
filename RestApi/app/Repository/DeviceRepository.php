<?php

namespace App\Repository;

use App\Device;
use Illuminate\Support\Facafes\Hash;

class DeviceRepository{

	// public function getAllbyid(){
	// 	$users = User::all();
	// 	return $users;
	// }

	public function getAllDevicesByUid($owner_uid){
		//$devices = Device::find($uid);
		$devices = Device::where('owner_uid', '=', $owner_uid)->get();
		return $devices;
	} 

	/**
     * Reset the status and random_link_ucode of the device
     *
     * @param Model $device
     * @param deviceuid
     * @return message
     */
	public function resetDevice($deviceUid){
		$device =  Device::find($deviceUid);
		$device->random_link_ucode = '';
		$device->status = "UNCONNECTED";
		$device->save();
		return $device;
	}

	// public function insertUser($input){
	// 	$user = new User();
	// 	$user->first_name = $input['first_name'];
	// 	$user->last_name = $input['last_name'];
	// 	$user->email=$input['email'];
	// 	$user->password = Hash::make($input['password']);
	// 	$user->city = $input['city'];
	// 	$user->status = $input['status'];
	// 	$user->save();
	// }

	// public function updateUser($id, $input){
	// 	$user = User::find($id);
	// 	$user->first_name = $input['first_name'];
	// 	$user->last_name = $input['last_name'];
	// 	$user->email=$input['email'];
	// 	$user->password = Hash::make($input['password']);
	// 	$user->city = $input['city'];
	// 	$user->status = $input['status'];
	// 	$user->save();	
	// }
	// public function deleteUser($id){
	// 	$user = User::find($id);
	// 	$user->delete();	
	// }

}