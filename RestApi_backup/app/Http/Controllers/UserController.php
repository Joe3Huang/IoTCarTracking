<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use App\Transformer\UserTransformer;
use App\Repository\UserRepository;
use Illuminate\Support\Facades\Auth;
//use Log;

class UserController extends Controller
{
    //

    use Helpers;

    protected $userRepository;
    protected $userTransformer;
    protected $messages = [
        'password'    => 'The :attribute must bedsdsad greater than :min .'
    ];

    public function __construct(UserRepository $userRepository, UserTransformer $userTransformer){
    	$this->userRepository = $userRepository;
    	$this->userTransformer = $userTransformer;

    }

    public function getCurrentUserInfo() {
        if (Auth::check()) {
            return Auth::user();
        }
    }

    public function show() {
    	$users = $this->userRepository->getAll();

    	$response = $users;//$this->reponse->item($users);//$this->reponse->item($user, new UserTransformer());

    	return $response;
    }

    public function registerUser(Request $request) {

        $validation = $this->validateRequest($request, [
            'first_name' => '',
            'last_name' => '',
            'email' => 'required|email|max:255',
            'password' => 'required|min:4',
            'city' => '',
            // 'status' => '',
            'username' => '',
            // 'role' => '',
            // 'isActive' => '',
        ]);
   
        if ($validation !== true) {
            return $this->sendInvalidFieldResponse($validation);
        }
        $this->userRepository->insertUser($request);
        return "OK";
    }
}
