<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Repository\DeviceRepository;

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

    public function getCurrentUserInfo(){
        if (Auth::check()) {
            return Auth::user();
        }
    }

    public function getAllTheDevices(){
        return $this->deviceRepository->getAllDevicesByUid($this->getCurrentUserInfo()->uid);
    }

    public function resetTheDevice(Request $request){
        $deviceUid = $request->input('uid');
        return $this->deviceRepository->resetDevice($deviceUid);
    }

}
