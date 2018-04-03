<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Repository\DeviceRepository;
use Illuminate\Support\Facades\Auth;

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
        $deviceUid = $request->input('uid');
        return $this->deviceRepository->resetDevice($deviceUid);
    }

}
