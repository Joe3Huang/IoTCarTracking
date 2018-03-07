<?php

namespace App\Repository;

use App\User;
use Illuminate\Support\Facafes\Hash;

class UserRepository{

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
		$user->first_name = $input['first_name'];
		$user->last_name = $input['last_name'];
		$user->email=$input['email'];
		$user->password = Hash::make($input['password']);
		$user->city = $input['city'];
		$user->status = $input['status'];
		$user->save();
	}

	public function updateUser($id, $input){
		$user = User::find($id);
		$user->first_name = $input['first_name'];
		$user->last_name = $input['last_name'];
		$user->email=$input['email'];
		$user->password = Hash::make($input['password']);
		$user->city = $input['city'];
		$user->status = $input['status'];
		$user->save();	
	}
	public function deleteUser($id){
		$user = User::find($id);
		$user->delete();	
	}

}