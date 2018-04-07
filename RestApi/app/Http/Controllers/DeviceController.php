<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Repository\DeviceRepository;
use Illuminate\Support\Facades\Auth;
use App\Library\Services\UuidInterface;
class DeviceController extends Controller
{

    protected $deviceRepository;
    protected $deviceTransformer;

    public function __construct(DeviceRepository $deviceRepository){
        $this->deviceRepository = $deviceRepository;
    //	$this->deviceTransformer = $deviceTransformer;
    }

    public function show(){
    	
    }

    public function getAllTheDevices(){
        return $this->deviceRepository->getAllDevicesByUid(Auth::user()->uid);
    }

    public function resetTheDevice(Request $request){
        $deviceUid = $request->input('device_uid');
        return $this->deviceRepository->resetDevice($deviceUid);
    }

    public function linkDeviceWithUser(Request $request){
        $deviceUid = $request->input('device_id');
        $UserUid = $request->input('user_id');
        
        return $this->deviceRepository->insertUserDeviceLink($UserUid, $deviceUid);
    }

    public function getDeviceByCode(Request $request, $device_code){
        return $this->deviceRepository->getDeviceByCode($device_code);
    }

    public function updateDeviceDetails(Request $request){
        // $deviceUid = $request->input('device_id');
        return json_encode($this->deviceRepository->updateDevice($request));
    }

}
