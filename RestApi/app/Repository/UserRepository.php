<?php

namespace App\Repository;

use App\User;
use App\Deveice;
use App\RegisterUser;
use App\PasswordReset;
use Illuminate\Support\Facades\Hash;
use App\Library\Services\UuidInterface;
use App\Repository\DeviceRepository;
class UserRepository{
	protected $uuidService;
	
	protected $device;

    public function __construct(UuidInterface $uuidService, DeviceRepository $device){
		$this->uuidService = $uuidService;
		$this->device = $device;
	}
	
	public function getAll(){
		$users = User::all();
		return $users;
	}

	public function getByid($id){
		$user = User::find($id);
		return $user;
	}

	public function getRegisterUserByUid($uid){
		$result = RegisterUser::where('uid', $uid)->first();// RegisterUser::find($uid);
		return $result;
	}

	public function getUserByEmail($email){
		// $result = User::find($email);
		$result = User::where('email', $email)->first();
		return $result;
	}
	
	public function getPasswordResetByToken($token){
		$result = PasswordReset::where('token', $token)->first();
		return $result;
	}


	public function insertUser($input){
		$user = new User();
		$user->uid = $input['uid'];
		$user->first_name = $input['first_name'];
		$user->last_name = $input['last_name'];
		$user->email=$input['email'];
		$user->password = $input['password'];
		$user->city = $input['city'];
		$user->status = '1';
		$user->username = $input['username'];
		$user->role = 'BASIC_USER';//$input['role'];
		$user->isActive = '0';//$input['isActive'];
		$user->save();
		return $user;
	}

	public function updateUser($id, $input){
		$user = User::find($id);
		$user->uid = $input['uid'];
		$user->first_name = $input['first_name'];
		$user->last_name = $input['last_name'];
		$user->email=$input['email'];
		$user->password = $input['password'];
		$user->city = $input['city'];
		$user->status = $input['status'];
		$user->username = $input['username'];
		$user->role = $input['role'];
		$user->isActive = $input['isActive'];
		$user->save();	
	}

	public function deleteUser($uid){
		$user = User::find($uid);
		$user->delete();	
	}

	public function deleteRegisterUser($uid){
		$user = RegisterUser::find($uid);
		$user->delete();
	}

	public function registerUser($input) {
		$count = RegisterUser::count();
		if ($count > 1000) {
			$deleteUs = RegisterUser::latest()->take($count)->skip(1)->get();
			foreach($deleteUs as $deleteMe){
				RegisterUser::where('uid', $deleteMe->uid)->delete();
			}			
		}
		$registerUser = RegisterUser::where('email', $input['email'])->first();
		if (!$registerUser) {
			$registerUser = new RegisterUser();
		}
		// $registerUser = new RegisterUser();
		$registerUser->uid = $this->uuidService->getUuid();
		$registerUser->first_name = $input['first_name'];
		$registerUser->last_name = $input['last_name'];
		$registerUser->email=$input['email'];
		$registerUser->password = Hash::make($input['password']);
		$registerUser->city = $input['city'];
		$registerUser->save();	
		return $registerUser;
	}

	public function registerUserViaEmail($registerUserData) {
		$user = $this->insertUser($registerUserData);	
		$this->device->insertAdminDevice($registerUserData);
		$device = [
			'uid' => $this->uuidService->getUuid(),
			'device_type' => 'MOBILE_GPS',
			'name' => 'First Device',
			'owner_uid' => $registerUserData['uid'],
		];
		$this->device->insertDevice($device);
		$this->deleteRegisterUser($registerUserData['uid']);
		return $user;
	}

	public function insertResetPassword($input) {
		$count = PasswordReset::count();
		if ($count > 100) {
			$deleteUs = PasswordReset::latest()->take($count)->skip(1)->get();
			foreach($deleteUs as $deleteMe){
				PasswordReset::where('token', $deleteMe->token)->delete();
			}			
		}
		$resetPassword = PasswordReset::where('email', $input['email'])->first();
		if (!$resetPassword) {
			$resetPassword = new PasswordReset();
		}
		$resetPassword->token = $this->uuidService->getUuid();
		$resetPassword->email=$input['email'];
		$resetPassword->created_at='';
		$resetPassword->save();	
		return $resetPassword;
	}

}

