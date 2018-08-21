<?php

namespace App\Repository;

use App\User;
use Illuminate\Support\Facades\Hash;
use App\Library\Services\UuidInterface;
class UserRepository{
    protected $uuidService;

    public function __construct(UuidInterface $uuidService){
        $this->uuidService = $uuidService;
	}
	
	public function getAll(){
		$users = User::all();
		return $users;
	}

	public function getByid($id){
		$user = User::find($id);
		return $user;
	}

	public function insertUser($input){
		$user = new User();
		$user->uid = $this->uuidService->getUuid();
		$user->first_name = $input['first_name'];
		$user->last_name = $input['last_name'];
		$user->email=$input['email'];
		$user->password = Hash::make($input['password']);
		$user->city = $input['city'];
		$user->status = '1';
		$user->username = $input['username'];
		$user->role = 'BASIC_USER';//$input['role'];
		$user->isActive = '0';//$input['isActive'];
		$user->save();
	}

	public function updateUser($id, $input){
		$user = User::find($id);
		$user->uid = $input['uid'];
		$user->first_name = $input['first_name'];
		$user->last_name = $input['last_name'];
		$user->email=$input['email'];
		$user->password = Hash::make($input['password']);
		$user->city = $input['city'];
		$user->status = $input['status'];
		$user->username = $input['username'];
		$user->role = $input['role'];
		$user->isActive = $input['isActive'];
		$user->save();	
	}
	public function deleteUser($id){
		$user = User::find($id);
		$user->delete();	
	}

}