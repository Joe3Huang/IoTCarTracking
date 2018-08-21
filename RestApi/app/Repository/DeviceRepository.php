<?php

namespace App\Repository;

use App\Device;
use App\Models\UserDeviceLink;
use Illuminate\Support\Facafes\Hash;
use Illuminate\Support\Facades\Auth;
use App\Library\Services\UuidInterface;
use Carbon\Carbon;
class DeviceRepository{

    protected $uuidService;


    public function __construct(UuidInterface $uuidService){
        $this->uuidService = $uuidService;
    }
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
		$device = Device::find($deviceUid);
		$device->random_link_ucode = '';
		$device->status = "UNCONNECTED";
		if ($device->save()) {
			return $device;
		}
		return "FAIL";
	}

	public function insertUserDeviceLink($UserUid, $deviceUid){
		// $device = Device::where('user_id','=', $UserUid)->orWhere('device_id','=', $deviceUid)->get();
		$device = UserDeviceLink::where([
			['user_id', '=', $UserUid],
			['device_id', '=', $deviceUid]
		])->get();

		if ($device->isNotEmpty()) {
			return "FAIL";
		} else {
			$uDLInk = new UserDeviceLink;
			$uDLInk->uid = $this->uuidService->getUuid();
			$uDLInk->user_id = $UserUid;
			$uDLInk->device_id = $deviceUid;
			if($uDLInk->save()) {
				return "OK";
			}
		}
		return "FAIL";
	}

	public function getDeviceByCode($device_code){
		try{
			$device = Device::where('device_code','=', $device_code)->get();
			if ($device->isNotEmpty()) {
				return $device;	
			} else {
				return json_encode("FAIL");
			}
		}
		catch (Illuminate\Database\QueryException $e){
			$error_code = $e->errorInfo[1];
			if($error_code == 1062){

			}
		}
		return json_encode("FAIL");
	}

	public function updateDevice($input){
		try{
			$device = Device::find($input['uid']);
			$device->random_link_ucode = $input['random_link_ucode'];
			$device->status = 'CONNECTED';
			// $user->last_name = $input['last_name'];
			// $user->email=$input['email'];
			// $user->password = Hash::make($input['password']);
			// $user->city = $input['city'];
			// $user->status = $input['status'];
			$device->save();
			return "OK";
		}
		catch (Illuminate\Database\QueryException $e){
			$error_code = $e->errorInfo[1];
			if($error_code == 1062){

			}
			return "FAIL";
		}
	}

	public function insertAdminDevice($input){
		$device = new Device();
		$device->uid = $input['uid'];
		$device->device_type = $device::BROWSER_ADMIN;
		$device->name='BROWSER_ADMIN';
		$device->owner_uid = $input['uid'];
		$device->expires_date = Carbon::createFromDate(2050, 1, 1, 'GMT');
		$device->random_link_ucode = $this->uuidService->getUuid();
		$device->status = $device::UNCONNECTED;
		$device->save();
		return $device;
	}

	public function insertDevice($input){
		$device = new Device();
		$device->uid = $input['uid'];
		$device->device_type = $input['device_type'];
		$device->name='device';
		$device->owner_uid = $input['owner_uid'];
		$device->expires_date = Carbon::createFromDate(2050, 1, 1, 'GMT');
		$device->isExpired = 0; 
		$device->random_link_ucode = '';//$this->uuidService->getUuid();
		$device->status = $device::UNCONNECTED;
		$device->save();
		return $device;
	}
	// public function deleteUser($id){
	// 	$user = User::find($id);
	// 	$user->delete();	
	// }

}