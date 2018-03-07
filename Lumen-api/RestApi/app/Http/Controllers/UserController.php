<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use App\Transformer\UserTransformer;
use App\Repository\UserRepository;
use Log;

class UserController extends Controller
{
    //

    use Helpers;

    protected $userRepository;
    protected $userTransformer;

    public function __construct(UserRepository $userRepository, UserTransformer $userTransformer){
    	$this->userRepository = $userRepository;
    	$this->userTransformer = $userTransformer;

    }


    public function show(){
    	$users = $this->userRepository->getAll();

    	$response = $users;//$this->reponse->item($users);//$this->reponse->item($user, new UserTransformer());

    	return $response;

    }
}
