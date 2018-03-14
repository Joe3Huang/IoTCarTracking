<?php


namespace App\Transformer;


use App\user_error;

use League\Fractal\TransformerAbstract;

class UserTransformer extends TransformerAbstract{

	function transform(User $user){
		return [
			'id'=>$user->id,
			'first_name' => $user->first_name,
			'last_name' => $user->last_name,
			'email'=>$user->email,
			'city'=>$user->city,
			'status'=>$user->status
		];
	}

}
